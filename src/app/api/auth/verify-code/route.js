import { connectDB } from "@/lib/db.js";
import { User } from "@/model/user.model.js";
import { NextResponse } from "next/server";
import {welcomeEmail} from "@/helpers/email.js";


export async function POST(request){
    try {
        await connectDB();

        const {email, otp} = await request.json();

        if(!email || !otp){
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and OTP are required",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const isCodeValid = user.otp === otp;
        const isCodeNotExpired = new Date(user.otpExpires) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            user.otp = null;

            await user.save();

            const fullName = `${user.firstName} ${user.lastName}`;
            const emailResponse = await welcomeEmail(email, fullName);

                if(!emailResponse.success) {
                    return NextResponse.json({
                        success: false,
                        message: "Failed to send Welcome email",            
                    }, {status: 500});
                }

            return NextResponse.json(
                {
                    success: true,
                    message: "Email verified successfully",
                },
                { status: 200 }
            );
        } else if(!isCodeNotExpired){
            return NextResponse.json(
                {
                    success: false,
                    message: "Verification Code Has Expired",
                },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid verification code",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error in verify email route:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );  
        
    }
}
