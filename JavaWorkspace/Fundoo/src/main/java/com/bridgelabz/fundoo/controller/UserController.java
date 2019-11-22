package com.bridgelabz.fundoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bridgelabz.fundoo.dto.LoginDto;
import com.bridgelabz.fundoo.dto.RegistrationDto;
import com.bridgelabz.fundoo.response.Response;
import com.bridgelabz.fundoo.services.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;




	 /**
	   * Create user user.
	   *
	   * @param user the user
	   * @return the user
	   */
	  @PostMapping("/registration")
	public Response registration(@RequestBody RegistrationDto registrationUser)
	  {

		  return userService.register(registrationUser);	
	  }
	  
	  
	  @GetMapping("/login")
	  public String login(@RequestBody LoginDto loginUser) {
			System.out.println("I M IN LOGIN CONTROLLER"+loginUser.getPassword());

			userService.login(loginUser);
		   return "Login Successfulllllll";
	  }

}
