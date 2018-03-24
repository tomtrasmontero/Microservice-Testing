package com.example.backendmicroservice.repositories;

import com.example.backendmicroservice.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}