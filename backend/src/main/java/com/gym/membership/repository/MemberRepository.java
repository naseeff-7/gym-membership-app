package com.gym.membership.repository;

import com.gym.membership.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    List<Member> findByStatus(Member.MemberStatus status);
    List<Member> findByPlan(Member.MembershipPlan plan);
    boolean existsByEmail(String email);
}
