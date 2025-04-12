package com.pbl5.gympose.entity;

import com.pbl5.gympose.utils.CommonConstant;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private List<User> users;

    public Role(String name) {
        this.name = name;
    }

    public String getRoleName() {
        return CommonConstant.PREFIX_ROLE + this.name.toUpperCase();
    }
}
