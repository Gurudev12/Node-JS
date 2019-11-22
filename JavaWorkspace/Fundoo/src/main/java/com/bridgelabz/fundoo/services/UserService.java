package com.bridgelabz.fundoo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import com.bridgelabz.fundoo.config.PasswordConfiguration;
import com.bridgelabz.fundoo.dto.LoginDto;
import com.bridgelabz.fundoo.dto.RegistrationDto;
import com.bridgelabz.fundoo.model.User;
import com.bridgelabz.fundoo.repository.UserRepository;
import com.bridgelabz.fundoo.response.Response;
import com.bridgelabz.fundoo.utility.Email;
import com.bridgelabz.fundoo.utility.JWTUtilToken;
import com.bridgelabz.fundoo.utility.JWTUtilToken;

@Service
public class UserService {
	private static final String String = null;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private Email emailService;

	@Autowired
	private   PasswordConfiguration passwordConfiguration; 
	
	
	JWTUtilToken jwtUtilToken;
	
	
	public Response register(RegistrationDto registrationUser) {
		// TODO Auto-generated method stub

		User user = new User();

		user.setFirstName(registrationUser.getFirstName());
		user.setLastName(registrationUser.getLastName());
		user.setEmail(registrationUser.getEmail());
		user.setPassword(passwordConfiguration.passwordEncoder().encode(registrationUser.getPassword()));

		userRepository.save(user);

		String userEmail = registrationUser.getEmail();
		try {
			emailService.sendNotification(userEmail);

		} catch (MailException e) {
			System.out.println("Error while sending mail");
		}

		return new Response(200, "Successful", true);

	}

	public Response login(LoginDto loginDto) {
		User findUserMail = userRepository.findByEmail(loginDto.getEmail());

		if (findUserMail == null) {
			System.out.println("User is not present");
		} else {
			
			boolean match = passwordConfiguration.passwordEncoder().matches(loginDto.getPassword(), findUserMail.getPassword());

			if(match)
			{
				System.out.println("login successful");
				

				String payload=findUserMail.getEmail();
				String token=jwtUtilToken.createToken(payload, "loginToken");
				
				System.out.println("User TOKEN is present======>>>>>"+token);

				return new Response(200, "Successful", true);

			}
			else {
				System.out.println("password wrong");
			}
		}
		return new Response(200, "Successful", true);
	}
}
