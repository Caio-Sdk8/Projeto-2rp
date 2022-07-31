use BancoProj2rp;
go

INSERT INTO tipoUsuario
VALUES ('Root'),
('Admin'),
('Geral');
GO

INSERT INTO usuario
VALUES (1, 'Caio Soares', 'caiosoares@2rpnet.com', '04123', 1),
(2, 'Ligia Munhoz', 'ligiamnh@2rpnet.com',	'178432', 1),
(3, 'Alexandre Borba',	'alexandrebo@2rpnet.com', '200496', 1),
(3, 'Fernando Ribeiro', 'fernandorib@2rpnet.com', '536123', 0);
GO

