package com.bridgelabz.fundoo.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.bridgelabz.fundoo.model.User;

@Component
public class Email {

	@Autowired
	private JavaMailSender javaMailSender;


	
	public void sendNotification( String userEmail) throws MailException {
		SimpleMailMessage mail= new SimpleMailMessage();
		mail.setTo(userEmail);
		mail.setSubject("Spring boot");
		mail.setText("Hi..i m sending this mail through spring boot");
		
		javaMailSender.send(mail);
	}
}
