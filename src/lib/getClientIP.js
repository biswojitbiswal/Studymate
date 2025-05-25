export function getClientIP(request){
    const forwarded = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");

    if(forwarded){
        return forwarded.split(",")[0].trim();
    }

    if(realIP){
        return realIP;
    }

    return '127.0.0.1';
}