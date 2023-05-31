package com.gabrielsmm.logistica.services;

import com.gabrielsmm.logistica.dtos.ClienteFormDTO;
import com.gabrielsmm.logistica.entities.Cliente;
import com.gabrielsmm.logistica.entities.Endereco;
import com.gabrielsmm.logistica.repositories.ClienteRepository;
import com.gabrielsmm.logistica.services.exceptions.DataIntegrityException;
import com.gabrielsmm.logistica.services.exceptions.ObjectNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente find(Integer id) {
        Optional<Cliente> obj = clienteRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName()));
    }

    public Cliente insert(ClienteFormDTO objDto) {
        Cliente obj = fromDTO(objDto);
        try {
            obj.setId(null);
            obj = clienteRepository.save(obj);
            return obj;
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não foi possível inserir, CNPJ já cadastrado.");
        }
    }

    public Cliente update(Integer id, ClienteFormDTO objDto) {
        Cliente newObj = find(id);
        try {
            updateData(newObj, objDto);
            return clienteRepository.save(newObj);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não foi possível atualizar, CNPJ já cadastrado.");
        }
    }

    public void delete(Integer id) {
        find(id);
        try {
            clienteRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Ocorreu um erro ao excluir");
        }
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Page<Cliente> findPage(Integer page, Integer linesPerPage, String orderBy, String direction, String filter) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        if (StringUtils.isNotBlank(filter)) {
            return clienteRepository.findAll(filter, pageRequest);
        } else {
            return clienteRepository.findAll(pageRequest);
        }
    }

    private void updateData(Cliente obj, ClienteFormDTO objDto) {
        // Atualizando cliente
        obj.setNome(objDto.getNome());
        obj.setCnpj(objDto.getCnpj());

        // Atualizando endereço
        Endereco end = obj.getEndereco();
        end.setEstado(objDto.getEstado());
        end.setCidade(objDto.getCidade());
        end.setBairro(objDto.getBairro());
        end.setLogradouro(objDto.getLogradouro());
        end.setComplemento(objDto.getComplemento());
        end.setCep(objDto.getCep());
        end.setLatitude(objDto.getLatitude());
        end.setLongitude(objDto.getLongitude());
    }

    public Cliente fromDTO(ClienteFormDTO objDto) {
        Cliente cli = new Cliente(null, objDto.getNome(), objDto.getCnpj());
        Endereco end = new Endereco(null, objDto.getEstado(), objDto.getCidade(), objDto.getBairro(), objDto.getLogradouro(), objDto.getComplemento(), objDto.getCep(), objDto.getLatitude(), objDto.getLongitude(), cli);
        cli.setEndereco(end);
        return cli;
    }

}
