package com.app.model.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import static com.app.model.user.Permission.ADMIN_CREATE;
import static com.app.model.user.Permission.ADMIN_DELETE;
import static com.app.model.user.Permission.ADMIN_READ;
import static com.app.model.user.Permission.ADMIN_UPDATE;

import static com.app.model.user.Permission.MANAGER_CREATE;
import static com.app.model.user.Permission.MANAGER_DELETE;
import static com.app.model.user.Permission.MANAGER_READ;
import static com.app.model.user.Permission.MANAGER_UPDATE;

import static com.app.model.user.Permission.CASHIER_CREATE;
import static com.app.model.user.Permission.CASHIER_DELETE;
import static com.app.model.user.Permission.CASHIER_READ;
import static com.app.model.user.Permission.CASHIER_UPDATE;

import static com.app.model.user.Permission.STOREKEEPER_CREATE;
import static com.app.model.user.Permission.STOREKEEPER_DELETE;
import static com.app.model.user.Permission.STOREKEEPER_READ;
import static com.app.model.user.Permission.STOREKEEPER_UPDATE;

import static com.app.model.user.Permission.TECHNICIAN_CREATE;
import static com.app.model.user.Permission.TECHNICIAN_DELETE;
import static com.app.model.user.Permission.TECHNICIAN_READ;
import static com.app.model.user.Permission.TECHNICIAN_UPDATE;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {

        USER(Collections.emptySet()),
        ADMIN(
                        Set.of(
                                        ADMIN_READ,
                                        ADMIN_UPDATE,
                                        ADMIN_DELETE,
                                        ADMIN_CREATE,
                                        MANAGER_READ,
                                        MANAGER_UPDATE,
                                        MANAGER_DELETE,
                                        MANAGER_CREATE)),
        MANAGER(
                        Set.of(
                                        MANAGER_READ,
                                        MANAGER_UPDATE,
                                        MANAGER_DELETE,
                                        MANAGER_CREATE)),
        CASHIER(
                        Set.of(
                                        CASHIER_CREATE,
                                        CASHIER_DELETE,
                                        CASHIER_READ,
                                        CASHIER_UPDATE)),
        STOREKEEPER(
                        Set.of(
                                        STOREKEEPER_CREATE,
                                        STOREKEEPER_DELETE,
                                        STOREKEEPER_READ,
                                        STOREKEEPER_UPDATE)),
        TECHNICIAN(
                        Set.of(
                                        TECHNICIAN_CREATE,
                                        TECHNICIAN_DELETE,
                                        TECHNICIAN_READ,
                                        TECHNICIAN_UPDATE));

        @Getter
        private final Set<Permission> permissions;

        public List<SimpleGrantedAuthority> getAuthorities() {
                var authorities = getPermissions()
                                .stream()
                                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                                .collect(Collectors.toList());
                authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
                return authorities;
        }
}
