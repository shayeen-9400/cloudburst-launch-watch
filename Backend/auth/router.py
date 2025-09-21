from fastapi import APIRouter, HTTPException
from .models import PhoneNumberRequest, OTPVerificationRequest
from .services import generate_and_store_otp, verify_otp

router = APIRouter()

@router.post("/send-otp")
async def send_otp_endpoint(request: PhoneNumberRequest):
    if not generate_and_store_otp(request.phone_number):
        raise HTTPException(status_code=500, detail="Failed to send OTP.")
    return {"success": True, "message": "OTP sent successfully."}

@router.post("/verify-otp")
async def verify_otp_endpoint(request: OTPVerificationRequest):
    success, message = verify_otp(request.phone_number, request.otp)
    if not success:
        raise HTTPException(status_code=401, detail=message)
    return {"success": True, "message": "OTP verified successfully.", "token": "YOUR_JWT_TOKEN_HERE"}