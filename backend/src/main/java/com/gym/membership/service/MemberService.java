package com.gym.membership.service;

import com.gym.membership.model.Member;
import com.gym.membership.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    public Member createMember(Member member) {
        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new RuntimeException("Member with email " + member.getEmail() + " already exists");
        }
        return memberRepository.save(member);
    }

    public Member updateMember(Long id, Member updatedMember) {
        return memberRepository.findById(id).map(member -> {
            member.setName(updatedMember.getName());
            member.setEmail(updatedMember.getEmail());
            member.setPhone(updatedMember.getPhone());
            member.setAge(updatedMember.getAge());
            member.setPlan(updatedMember.getPlan());
            member.setStatus(updatedMember.getStatus());
            member.setAddress(updatedMember.getAddress());
            member.setEmergencyContact(updatedMember.getEmergencyContact());
            member.setMembershipFee(updatedMember.getMembershipFee());
            return memberRepository.save(member);
        }).orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new RuntimeException("Member not found with id: " + id);
        }
        memberRepository.deleteById(id);
    }

    public List<Member> getMembersByStatus(Member.MemberStatus status) {
        return memberRepository.findByStatus(status);
    }

    public List<Member> getMembersByPlan(Member.MembershipPlan plan) {
        return memberRepository.findByPlan(plan);
    }
}
