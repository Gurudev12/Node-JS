package com.bridgelabz.fundoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bridgelabz.fundoo.dto.RegistrationDto;
import com.bridgelabz.fundoo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	public User findByEmail(String email);
	
	public User findByPassword(String password);

}
