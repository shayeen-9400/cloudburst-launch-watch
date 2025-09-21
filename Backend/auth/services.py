import os
import pyotp
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

otp_store = {}

def send_sms_otp(phone_number: str, otp: str) -> bool:
    print(f"** DEV INFO: Sending OTP '{otp}' to {phone_number} **")
    return True

def generate_and_store_otp(phone_number: str):
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret, interval=300)
    otp_code = totp.now()

    if send_sms_otp(phone_number, otp_code):
        otp_store[phone_number] = {
            "secret": secret,
            "expires_at": totp.provisioning_uri("user", "CloudburstApp")
        }
        return True
    return False

def verify_otp(phone_number: str, user_otp: str):
    if phone_number not in otp_store:
        return False, "Phone number not found or OTP expired."

    stored_data = otp_store[phone_number]
    secret = pyotp.parse_uri(stored_data["expires_at"]).secret
    totp = pyotp.TOTP(secret, interval=300)

    if totp.verify(user_otp):
        del otp_store[phone_number]
        return True, "OTP verified successfully."

    return False, "Invalid OTP."