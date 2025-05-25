import redis from "./redis.js";
import { Ratelimit } from "@upstash/ratelimit";

export const loginLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "ratelimit:login",
})

export const registerLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "ratelimit:register",
})

export const forgotPasswordLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "ratelimit:forgot-password",
})