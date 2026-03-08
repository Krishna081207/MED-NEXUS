from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import io
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from PyPDF2 import PdfReader

load_dotenv()

app = FastAPI(title="HealthMate AI API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure LangChain with Google Generative AI
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    message: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    error: Optional[str] = None

class HealthAssessmentRequest(BaseModel):
    mental_symptoms: str = ""
    physical_symptoms: str = ""

class HealthAssessmentResponse(BaseModel):
    mental_health: str
    physical_health: str
    overall_recommendation: str
    risk_level: str
    error: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "HealthMate AI API is running with LangChain", "version": "2.0.0"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Get the last user message
        user_message = request.message if request.message else request.messages[-1].content
        
        if not GEMINI_API_KEY:
            # Fallback response if no API key
            return ChatResponse(
                message="I'm here to support your health journey. While I'm operating in limited mode, I can still listen and provide general wellness guidance. How can I help you today?"
            )
        
        # Initialize LangChain ChatGoogleGenerativeAI
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=GEMINI_API_KEY,
            temperature=0.7
        )
        
        # Create system prompt for health assistant
        system_prompt = """You are HealthMate, a compassionate AI health companion. Your role is to:
- Provide emotional support and encouragement
- Offer general wellness and health information
- Listen actively and respond empathetically
- Suggest when professional medical help should be sought
- Always remind users that you're not a replacement for professional medical advice

Be warm, understanding, and supportive in your responses. Keep answers concise but helpful."""
        
        # Build conversation history for LangChain
        messages_list = []
        
        for msg in request.messages[:-1]:  # Exclude the last message
            if msg.role == 'user':
                messages_list.append(HumanMessage(content=msg.content))
            else:
                messages_list.append(AIMessage(content=msg.content))
        
        # Add the current user message
        messages_list.append(HumanMessage(content=f"{system_prompt}\n\nUser: {user_message}"))
        
        # Generate response using LangChain
        response = llm.invoke(messages_list)
        ai_message = response.content
        
        return ChatResponse(message=ai_message)
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return ChatResponse(
            message="I'm experiencing some technical difficulties. Please try again in a moment.",
            error=str(e)
        )

@app.post("/api/assess-health", response_model=HealthAssessmentResponse)
async def assess_health(request: HealthAssessmentRequest):
    try:
        if not request.mental_symptoms and not request.physical_symptoms:
            return HealthAssessmentResponse(
                mental_health="No mental health symptoms provided.",
                physical_health="No physical health symptoms provided.",
                overall_recommendation="Please provide symptoms to receive an assessment.",
                risk_level="unknown",
                error="No symptoms provided"
            )
        
        if not GEMINI_API_KEY:
            return HealthAssessmentResponse(
                mental_health="Assessment unavailable - API not configured.",
                physical_health="Assessment unavailable - API not configured.",
                overall_recommendation="Please contact support.",
                risk_level="unknown",
                error="API not configured"
            )
        
        # Initialize LangChain ChatGoogleGenerativeAI
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=GEMINI_API_KEY,
            temperature=0.8
        )
        
        # Create analysis prompts for mental health
        mental_health_prompt = f"""You are a health assessment AI. Analyze the following mental health symptoms and provide:
1. A brief assessment of the symptoms
2. Potential causes or conditions that might be related
3. Suggested coping strategies
4. When to seek professional help

Patient's mental health symptoms: {request.mental_symptoms if request.mental_symptoms else "No mental health symptoms reported"}

Provide a compassionate, non-alarmist analysis."""

        # Create analysis prompts for physical health
        physical_health_prompt = f"""You are a health assessment AI. Analyze the following physical health symptoms and provide:
1. A brief assessment of the symptoms
2. Possible conditions that might be related
3. General wellness recommendations
4. When to seek professional medical attention

Patient's physical health symptoms: {request.physical_symptoms if request.physical_symptoms else "No physical health symptoms reported"}

Provide a compassionate, non-alarmist analysis."""

        # Create overall risk assessment prompt
        risk_assessment_prompt = f"""Based on the following symptoms, assess the overall risk level (low, moderate, or high) and provide recommendations:

Mental Health Symptoms: {request.mental_symptoms if request.mental_symptoms else "None reported"}
Physical Health Symptoms: {request.physical_symptoms if request.physical_symptoms else "None reported"}

Provide:
1. Risk Level: (low/moderate/high)
2. Overall health assessment
3. Actionable recommendations
4. When professional help is needed

Be concise and practical."""

        # Get mental health analysis
        mental_response = llm.invoke([HumanMessage(content=mental_health_prompt)])
        mental_health_analysis = mental_response.content

        # Get physical health analysis
        physical_response = llm.invoke([HumanMessage(content=physical_health_prompt)])
        physical_health_analysis = physical_response.content

        # Get risk assessment and recommendations
        risk_response = llm.invoke([HumanMessage(content=risk_assessment_prompt)])
        risk_assessment = risk_response.content

        # Extract risk level from response
        risk_level = "moderate"  # default
        if "low" in risk_assessment.lower() and "low risk" in risk_assessment.lower():
            risk_level = "low"
        elif "high" in risk_assessment.lower() and "high risk" in risk_assessment.lower():
            risk_level = "high"

        return HealthAssessmentResponse(
            mental_health=mental_health_analysis,
            physical_health=physical_health_analysis,
            overall_recommendation=risk_assessment,
            risk_level=risk_level
        )

    except Exception as e:
        print(f"Error in health assessment endpoint: {str(e)}")
        return HealthAssessmentResponse(
            mental_health="Assessment failed.",
            physical_health="Assessment failed.",
            overall_recommendation="Please try again later.",
            risk_level="unknown",
            error=str(e)
        )

class ReportAnalysisResponse(BaseModel):
    summary: str
    key_findings: str
    recommendations: str
    plain_language_explanation: str
    error: Optional[str] = None

@app.post("/api/analyze-report", response_model=ReportAnalysisResponse)
async def analyze_report(file: UploadFile = File(...)):
    try:
        if not file.filename or not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Please upload a PDF file")
        
        contents = await file.read()
        reader = PdfReader(io.BytesIO(contents))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        
        if not text.strip():
            return ReportAnalysisResponse(
                summary="Could not extract text from this PDF.",
                key_findings="The PDF may be scanned or image-based. Try uploading a text-based PDF.",
                recommendations="Consider using a text-based health report or re-scanning with OCR.",
                plain_language_explanation="We couldn't read the content of your report.",
                error="No text extracted from PDF"
            )
        
        if not GEMINI_API_KEY:
            return ReportAnalysisResponse(
                summary="AI analysis is not configured.",
                key_findings="Please set up the API key to enable report analysis.",
                recommendations="Contact support for assistance.",
                plain_language_explanation="Report analysis requires configuration.",
                error="API not configured"
            )
        
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=GEMINI_API_KEY,
            temperature=0.3
        )
        
        prompt = f"""You are a health report analyst. Analyze this medical/health report. Respond with exactly these 4 sections, each starting with the header on its own line:

SUMMARY:
[A 2-3 sentence overview of what the report shows]

KEY FINDINGS:
[Bullet points of important values/results in simple terms]

RECOMMENDATIONS:
[What the patient should do next or discuss with their doctor]

PLAIN LANGUAGE:
[Explain the report in simple, non-medical terms for the patient]

Report content:
---
{text[:12000]}
---

Be compassionate and clear. Remind that this is not medical advice."""

        response = llm.invoke([HumanMessage(content=prompt)])
        ai_content = response.content
        
        def extract_section(content: str, header: str, next_headers: list) -> str:
            c_upper = content.upper()
            start = c_upper.find(header.upper())
            if start == -1:
                return ""
            start += len(header)
            end = len(content)
            for nh in next_headers:
                pos = c_upper.find(nh.upper(), start)
                if pos != -1 and pos < end:
                    end = pos
            return content[start:end].strip()
        
        summary = extract_section(ai_content, "SUMMARY:", ["KEY FINDINGS:", "RECOMMENDATIONS:", "PLAIN LANGUAGE:"])
        key_findings = extract_section(ai_content, "KEY FINDINGS:", ["SUMMARY:", "RECOMMENDATIONS:", "PLAIN LANGUAGE:"])
        recommendations = extract_section(ai_content, "RECOMMENDATIONS:", ["SUMMARY:", "KEY FINDINGS:", "PLAIN LANGUAGE:"])
        plain_language = extract_section(ai_content, "PLAIN LANGUAGE:", ["SUMMARY:", "KEY FINDINGS:", "RECOMMENDATIONS:"])
        
        if not summary:
            summary = ai_content[:800]
        if not key_findings:
            key_findings = ai_content[:800]
        if not recommendations:
            recommendations = ai_content[:800]
        if not plain_language:
            plain_language = ai_content[:800]
        
        return ReportAnalysisResponse(
            summary=summary,
            key_findings=key_findings,
            recommendations=recommendations,
            plain_language_explanation=plain_language
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in report analysis: {str(e)}")
        return ReportAnalysisResponse(
            summary="Analysis failed.",
            key_findings="",
            recommendations="Please try again or upload a different file.",
            plain_language_explanation="",
            error=str(e)
        )

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "gemini_configured": bool(GEMINI_API_KEY),
        "using_langchain": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
