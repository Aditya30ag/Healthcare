package org.zenith.pay.demo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;
import java.util.Date;




@Component
public class JwtUtil {
    private static final String SECRET = "your-secret-key"; // Use a strong secret key

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuer("zenith-pay")
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000)) // Token valid for 1 hour
                .sign(Algorithm.HMAC256(SECRET));
    }
}
