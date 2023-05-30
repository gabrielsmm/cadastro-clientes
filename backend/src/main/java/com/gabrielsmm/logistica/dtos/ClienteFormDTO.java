package com.gabrielsmm.logistica.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteFormDTO {

    @NotBlank(message="Preenchimento do nome é obrigatório")
    private String nome;

    @NotBlank(message="Preenchimento do CNPJ é obrigatório")
    @Size(min = 14, max = 14, message = "CNPJ precisa ter 14 caracteres")
    private String cnpj;

    @NotBlank(message="Preenchimento do estado é obrigatório")
    private String estado;

    @NotBlank(message="Preenchimento da cidade é obrigatório")
    private String cidade;

    @NotBlank(message="Preenchimento do bairro é obrigatório")
    private String bairro;

    @NotBlank(message="Preenchimento do logradouro é obrigatório")
    private String logradouro;

    private String complemento;

    @NotBlank(message="Preenchimento do CEP é obrigatório")
    @Size(min = 8, max = 8, message = "CEP precisa ter 8 caracteres")
    private String cep;

    private Double latitude;

    private Double longitude;

}
