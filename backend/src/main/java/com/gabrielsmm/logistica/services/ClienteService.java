package com.gabrielsmm.logistica.services;

import com.gabrielsmm.logistica.dtos.ClienteFormDTO;
import com.gabrielsmm.logistica.entities.Cliente;
import com.gabrielsmm.logistica.entities.Endereco;
import com.gabrielsmm.logistica.repositories.ClienteRepository;
import com.gabrielsmm.logistica.repositories.EnderecoRepository;
import com.gabrielsmm.logistica.services.exceptions.DataIntegrityException;
import com.gabrielsmm.logistica.services.exceptions.ObjectNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Cliente find(Integer id) {
        Optional<Cliente> obj = clienteRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName()));
    }

    public Cliente insert(Cliente obj) {
        try {
            obj.setId(null);
            obj = clienteRepository.save(obj);
            enderecoRepository.saveAll(obj.getEnderecos());
            return obj;
        } catch (Exception e) {
            throw new DataIntegrityException("Não foi possível inserir, CNPJ já cadastrado.");
        }
    }

    public Cliente update(ClienteFormDTO objDto) {
        Cliente newObj = find(objDto.getId());
        try {
            updateData(newObj, objDto);
            enderecoRepository.saveAll(newObj.getEnderecos());
            return clienteRepository.save(newObj);
        } catch (Exception e) {
            throw new DataIntegrityException("Não foi possível atualizar, CNPJ já cadastrado.");
        }
    }

    public void delete(Integer id) {
        find(id);
        try {
            clienteRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir");
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

    private void updateData(Cliente newObj, ClienteFormDTO obj) {
        // Atualizando cliente
        newObj.setNome(obj.getNome());
        newObj.setCnpj(obj.getCnpj());

        // Atualizando endereço
        Endereco end = newObj.getEnderecos().get(0);
        end.setEstado(obj.getEstado());
        end.setCidade(obj.getCidade());
        end.setBairro(obj.getBairro());
        end.setLogradouro(obj.getLogradouro());
        end.setComplemento(obj.getComplemento());
        end.setCep(obj.getCep());
        end.setLatitude(obj.getLatitude());
        end.setLongitude(obj.getLongitude());
    }

    public Cliente fromDTO(ClienteFormDTO objDto) {
        Cliente cli = new Cliente(null, objDto.getNome(), objDto.getCnpj());
        Endereco end = new Endereco(null, objDto.getEstado(), objDto.getCidade(), objDto.getBairro(), objDto.getLogradouro(), objDto.getComplemento(), objDto.getCep(), objDto.getLatitude(), objDto.getLongitude(), cli);
        cli.getEnderecos().add(end);
        return cli;
    }

}
