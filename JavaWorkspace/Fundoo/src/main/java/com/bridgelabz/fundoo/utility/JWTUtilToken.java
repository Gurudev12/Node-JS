package com.bridgelabz.fundoo.utility;


import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


public class JWTUtilToken {


	public String createToken(String email, String tokenName) {
		System.out.println("IN SIDE JWT TOKEN");

		return Jwts.builder().setSubject(email).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, tokenName)
				.compact();
	}


}
