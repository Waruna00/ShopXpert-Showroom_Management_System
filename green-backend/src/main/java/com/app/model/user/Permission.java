package com.app.model.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MANAGER_READ("management:read"),
    MANAGER_UPDATE("management:update"),
    MANAGER_CREATE("management:create"),
    MANAGER_DELETE("management:delete"),
    CASHIER_READ("cashier:read"),
    CASHIER_UPDATE("cashier:update"),
    CASHIER_CREATE("cashier:create"),
    CASHIER_DELETE("cashier:delete"),
    STOREKEEPER_READ("storekeeper:read"),
    STOREKEEPER_UPDATE("storekeeper:update"),
    STOREKEEPER_CREATE("storekeeper:create"),
    STOREKEEPER_DELETE("storekeeper:delete"),
    TECHNICIAN_READ("technician:read"),
    TECHNICIAN_UPDATE("technician:update"),
    TECHNICIAN_CREATE("technician:create"),
    TECHNICIAN_DELETE("technician:delete")
    

    ;

    @Getter
    private final String permission;
}
