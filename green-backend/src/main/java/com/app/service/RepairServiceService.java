package com.app.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.app.model.RepairService;
import com.app.repository.CustomerRepo;
import com.app.repository.RepairServiceRepo;
import com.app.request.AddRepairRequest;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder
@Service
@RequiredArgsConstructor
public class RepairServiceService {
        private final RepairServiceRepo repository;
        private final CustomerRepo customerRepo;

        public AddRepairRequest addRepairService(AddRepairRequest request) {

                var repairService = RepairService.builder()
                                .item_name(request.getItemname())
                                .serial(request.getSerial())
                                .description(request.getDescription())
                                .status(request.getStatus())
                                .estimation(request.getEstimation())
                                .item_description(request.getItemdescription())
                                .date(LocalDate.now())
                                .customer(customerRepo.findById(request.getCustomer())
                                                .orElseThrow(() -> new RuntimeException("customer not found")))
                                .build();

                repository.save(repairService);
                return AddRepairRequest.builder()
                                .itemname(repairService.getItem_name())
                                .serial(repairService.getSerial())
                                .description(repairService.getDescription())
                                .status(repairService.getStatus())
                                .itemdescription(repairService.getItem_description())
                                .estimation(repairService.getEstimation())
                                // .date(repairService.getDate())
                                .build();

        }

        public RepairService getLastRepairService() {
                return repository.findTopByOrderByServicenoDesc();
        }

        public java.util.List<RepairService> getAllRepairService() {
                return repository.findAll();
        }

        public Optional<RepairService> findById(String serviceNumber) {
                return repository.findById(serviceNumber);
        }

        public RepairService update(RepairService repairServiceRequest) {
                Optional<RepairService> optionalRepairService = repository.findById(Integer.toString(repairServiceRequest.getServiceno()));
                if (optionalRepairService.isPresent()) {
                        RepairService repairService = optionalRepairService.get();
                        repairService.setItem_name(repairServiceRequest.getItem_name());
                        repairService.setSerial(repairServiceRequest.getSerial());
                        repairService.setDescription(repairServiceRequest.getDescription());
                        repairService.setStatus(repairServiceRequest.getStatus());
                        repairService.setEstimation(repairServiceRequest.getEstimation());
                        repairService.setCost(repairServiceRequest.getCost());
                        repairService.setItem_description(repairServiceRequest.getItem_description());
                        repairService.setCustomer(repairServiceRequest.getCustomer());
                        return repository.save(repairService);
                }
                return null;
        }

}
