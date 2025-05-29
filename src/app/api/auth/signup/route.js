import {User} from '@/model/user.model.js';
import {sendVerificationEmail} from '@/helpers/email.js';
import { connectDB } from '@/lib/db.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();
        const {firstName, lastName, email, password} = await request.json();

        if([firstName, lastName, email, password].some((field) => field?.trim() === '')){
            return NextResponse.json({
                success: false,
                message: "All fields required",
                },
                {status: 400}
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 10);

        const otp = crypto.randomInt(100000, 999999).toString();

        const userFindByEmail = await User.findOne({email: email.toLowerCase()});

        if(userFindByEmail){
            if(userFindByEmail.isVerified){
                return NextResponse.json(
                    {
                        success: false,
                        message: "User already exists",
                    }, 
                    {status: 400}
                );
            } else {
                userFindByEmail.password = hashedPassword;
                userFindByEmail.otp = otp;
                userFindByEmail.otpExpires = otpExpires;

                await userFindByEmail.save();
            }
        } else {
            const newuser = new User({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
                otp: otp,
                otpExpires: otpExpires,
                isVerified: false
            });

            await newuser.save();
        }

        const fullName = `${firstName} ${lastName}`;

        const emailResponse = await sendVerificationEmail(email, otp, fullName);

        if(!emailResponse.success) {
            return NextResponse.json({
                success: false,
                message: "Failed to send verification email",

            }, {status: 500});
        }

        return NextResponse.json({
            success: true,
            message: "Verification Code has been sent to your registered Email address",
        }, {status: 201})
    } catch (error) {
        console.error("Error in user registration:", error);
        return NextResponse.json({
            success: false,
            message: "Error Registering User",
        }, {status: 500});
    }
}