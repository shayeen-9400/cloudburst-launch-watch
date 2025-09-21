from pydantic import BaseModel, Field

class PhoneNumberRequest(BaseModel):
    phone_number: str = Field(..., min_length=10, max_length=15, example="+919876543210")

class OTPVerificationRequest(BaseModel):
    phone_number: str = Field(..., min_length=10, max_length=15, example="+919876543210")
    otp: str = Field(..., min_length=6, max_length=6)