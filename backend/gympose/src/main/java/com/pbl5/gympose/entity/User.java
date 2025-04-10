package com.pbl5.gympose.entity;

import com.pbl5.gympose.enums.Gender;
import com.pbl5.gympose.notification.Notification;
import com.pbl5.gympose.security.domain.UserProvider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Email
    @Column(nullable = false, unique = true)
    String email;

    @Column(columnDefinition = "text", nullable = true)
    String avatar;

    @Column(nullable = false)
    String firstName;

    @Column(nullable = false)
    String lastName;

    @Enumerated(EnumType.STRING)
    Gender gender;

    @Column(nullable = false)
    Boolean isEnabled = false;

    String password;
    LocalDate dateOfBirth;
    Double height;
    Double weight;
    UUID accountVerificationToken;
    LocalDateTime accountVerifiedAt;
    Integer resetPasswordToken;
    LocalDateTime requestResetPasswordAt;
    Integer deleteAccountToken;
    LocalDateTime requestDeleteAccountAt;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_role",  // Tên bảng nối
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<WorkoutHistory> workoutHistories = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Notification> notifications = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<UserProvider> userProviders = new ArrayList<>();

    public int getAge() {
        return LocalDate.now().getYear() - this.getDateOfBirth().getYear();
    }

    public double getKcal() {
        double bmr = 10 * this.weight + 6.25 * height - 5 * this.getAge() + 5;
        double tdee = bmr * 1.55;
        return tdee;
    }
}
