package com.gym.membership.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Valid email is required")
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone must be 10 digits")
    private String phone;

    @Min(value = 16, message = "Age must be at least 16")
    @Max(value = 80, message = "Age must be at most 80")
    private Integer age;

    @Enumerated(EnumType.STRING)
    private MembershipPlan plan;

    @Enumerated(EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVE;

    private String address;
    private String emergencyContact;
    private Double membershipFee;

    public enum MembershipPlan { BASIC, PREMIUM, ANNUAL }
    public enum MemberStatus { ACTIVE, EXPIRED, SUSPENDED }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public MembershipPlan getPlan() { return plan; }
    public void setPlan(MembershipPlan plan) { this.plan = plan; }
    public MemberStatus getStatus() { return status; }
    public void setStatus(MemberStatus status) { this.status = status; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
    public Double getMembershipFee() { return membershipFee; }
    public void setMembershipFee(Double membershipFee) { this.membershipFee = membershipFee; }
}
