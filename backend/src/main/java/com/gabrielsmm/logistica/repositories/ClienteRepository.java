package com.gabrielsmm.logistica.repositories;

import com.gabrielsmm.logistica.entities.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query(value = " SELECT obj.*, obj.id AS obj_id, endereco.id AS endereco_id " +
                   " FROM CLIENTES AS obj " +
                   " JOIN ENDERECOS AS endereco ON endereco.cliente_id = obj.id " +
                   " WHERE INSTR(UPPER(CONCAT_WS(' ', endereco.estado, endereco.cidade, endereco.bairro, endereco.logradouro, endereco.complemento, endereco.cep)), UPPER(:filter)) > 0 ",
           countQuery = " SELECT COUNT(*) " +
                        " FROM CLIENTES AS obj " +
                        " JOIN ENDERECOS AS endereco ON endereco.cliente_id = obj.id " +
                        " WHERE INSTR(UPPER(CONCAT_WS(' ', endereco.estado, endereco.cidade, endereco.bairro, endereco.logradouro, endereco.complemento, endereco.cep)), UPPER(:filter)) > 0 ",
           nativeQuery = true)
    Page<Cliente> findAll(@Param(value = "filter") String filter, Pageable pageable);

}
