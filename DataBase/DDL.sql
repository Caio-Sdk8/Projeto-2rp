create database PROCESSO2RP;
go

use PROCESSO2RP;
go

create table tipoUsuario(
idTipoUsuario smallint primary key identity,
tipoUsuario varchar(5) not null
);
go

create table usuario(
idUsuario smallint primary key identity,
idTipoUsuario smallint foreign key references tipoUsuario(idTipoUsuario) not null,
nome varchar(50) not null,
email varchar(150) not null unique,
senha varchar(30) not null,
status bit not null
);
go
