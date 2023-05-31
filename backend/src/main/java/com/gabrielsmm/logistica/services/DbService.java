package com.gabrielsmm.logistica.services;

import com.gabrielsmm.logistica.entities.Cliente;
import com.gabrielsmm.logistica.entities.Endereco;
import com.gabrielsmm.logistica.repositories.ClienteRepository;
import com.gabrielsmm.logistica.repositories.EnderecoRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class DbService {

    private ClienteRepository clienteRepository;

    private EnderecoRepository enderecoRepository;

    public DbService(ClienteRepository clienteRepository, EnderecoRepository enderecoRepository) {
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
    }

    public void instanciaBaseDeDados() {
        Cliente c1 = new Cliente(null, "Atacado Max", "15398293000184");
        Cliente c2 = new Cliente(null, "Mega Distribuidora", "48444626000113");
        Cliente c3 = new Cliente(null, "Distribuidora Suprema", "12736274000122");
        Cliente c4 = new Cliente(null, "Atacado Prime", "30061116000100");
        Cliente c5 = new Cliente(null, "Varejão Atacadista", "16583516000146");

        Endereco end1 = new Endereco(null, "GO", "Goiânia", "Setor Central", "Av. Leste Oeste", "", "74055235", -16.65, -49.30, c1);
        Endereco end2 = new Endereco(null, "PE", "Recife", "São José", "R. Mirandópolis", "", "50080320", -8.07, -34.90, c2);
        Endereco end3 = new Endereco(null, "SC", "Florianópolis", "Sambaqui", "R. Osvaldo da Rocha Pires", "", "88051145", -27.48, -48.52, c3);
        Endereco end4 = new Endereco(null, "SP", "São Paulo", "Osasco", "Av. das FLores", "", "02675031", -23.53, -46.79, c4);
        Endereco end5 = new Endereco(null, "RJ", "Rio de Janeiro", "Copacabana", "R. Miguel Lemos", "", "22071000", -22.97, -43.19, c5);

        c1.setEndereco(end1);
        c2.setEndereco(end2);
        c3.setEndereco(end3);
        c4.setEndereco(end4);
        c5.setEndereco(end5);

        this.clienteRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5));
        this.enderecoRepository.saveAll(Arrays.asList(end1, end2, end3, end4, end5));
    }

}
