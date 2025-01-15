-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2025 a las 01:15:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `skyawards`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(0, 'El más furro'),
(1, 'El lost media de Skyland'),
(2, 'El más asaltacunas'),
(3, 'El más vende humo'),
(4, 'El más muerto'),
(5, 'El más irritante'),
(6, 'El ship del año'),
(7, 'El mayor tryhard en Minecraft'),
(8, 'Mejor serie/evento'),
(9, 'La mejor frase'),
(10, 'El simp del año'),
(11, 'La mejor memosificación'),
(12, 'El mejor fanart'),
(13, 'El cuckeado del año'),
(14, 'El pendejo del año'),
(15, 'El protagonista de Skyland 2024');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nominados`
--

CREATE TABLE `nominados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `imagen` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nominados`
--

INSERT INTO `nominados` (`id`, `nombre`, `imagen`) VALUES
(0, 'Manuxs', 'manuxs.jpg'),
(1, 'Memo', 'memo.jpg'),
(2, 'Mylo', 'mylo.jpg'),
(3, 'Many', 'many.jpg'),
(4, 'Novand', 'novand.jpg'),
(5, 'Kuser', 'kuser.jpg'),
(6, 'Noah', 'noah.jpg'),
(7, 'Sans', 'sans.jpg'),
(8, 'Mike', 'mike.jpg'),
(9, 'Purguist', 'purguist.jpg'),
(10, 'Zyder', 'zyder.jpg'),
(11, 'Osmar', 'osmar.jpg'),
(12, 'Edgar', 'edgar.jpg'),
(13, 'Pepino', 'pepino.jpg'),
(14, 'Exsay', 'exsay.jpg'),
(15, 'Lextan', 'lextan.jpg'),
(16, 'Meloh', 'meloh.jpg'),
(17, 'More', 'more.jpg'),
(18, 'Pablo', 'pablo.jpg'),
(19, 'Pokshiu', 'pokshiu.jpg'),
(20, 'Shae', 'shae.jpg'),
(21, 'Tomasu', 'tomasu.jpg'),
(22, 'Dai', 'dai.jpg'),
(23, 'Weverest', 'weverest.jpg'),
(24, 'Zaider', 'zaider.jpg'),
(25, 'La papa muerta', 'papa_muerta.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nominadoscategoria`
--

CREATE TABLE `nominadoscategoria` (
  `id` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `idNominado1` int(11) NOT NULL,
  `idNominado2` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `imagen` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nominadoscategoria`
--

INSERT INTO `nominadoscategoria` (`id`, `idCategoria`, `idNominado1`, `idNominado2`, `nombre`, `imagen`) VALUES
(0, 0, 4, 4, 'Novand', 'novand.jpg'),
(1, 0, 1, 1, 'Memo', 'memo.jpg'),
(2, 0, 2, 2, 'Mylo', 'mylo.jpg'),
(3, 0, 3, 3, 'Many', 'many.jpg'),
(4, 0, 12, 12, 'Edgar', 'edgar.jpg'),
(5, 1, 19, 19, 'Pokshiu', 'pokshiu.jpg'),
(6, 1, 24, 24, 'Zaider', 'zaider.jpg'),
(7, 1, 17, 17, 'More', 'more.jpg'),
(8, 1, 3, 3, 'La papa muerta', 'papa_muerta.jpg'),
(9, 1, 23, 23, 'Weverest', 'weverest.jpg'),
(10, 2, 1, 1, 'Memo', 'memo.jpg'),
(11, 2, 4, 4, 'Novand', 'novand.jpg'),
(12, 2, 7, 7, 'Sans', 'sans.jpg'),
(13, 2, 2, 2, 'Mylo', 'mylo.jpg'),
(14, 2, 17, 17, 'More', 'more.jpg'),
(15, 3, 2, 2, 'Mylo - Duck Game', 'mylo_duckgame.jpg'),
(16, 3, 5, 5, 'Kuser - Iceberg de Skyland', 'kuser_iceberg.jpg'),
(17, 3, 4, 4, 'Novand - Servidor de Terraria', 'novand_terraria.jpg'),
(18, 3, 20, 20, 'Shae - Tiktok de Skyland', 'skyland_tiktok.jpg'),
(19, 3, 1, 1, 'Memo - Canal de Youtube de Skyland', 'skyland_yt.jpg'),
(20, 4, 11, 11, 'Osmar', 'osmar.jpg'),
(21, 4, 18, 18, 'Pablo', 'pablo.jpg'),
(22, 4, 14, 14, 'Exsay', 'exsay.jpg'),
(23, 4, 13, 13, 'Pepino', 'pepino.jpg'),
(24, 4, 16, 16, 'Meloh', 'meloh.jpg'),
(25, 5, 6, 6, 'Noah', 'noah.jpg'),
(26, 5, 8, 8, 'Mike', 'mike.jpg'),
(27, 5, 7, 7, 'Sans', 'sans.jpg'),
(28, 5, 15, 15, 'Lextan', 'lextan.jpg'),
(29, 5, 21, 21, 'Tomasu', 'tomasu.jpg'),
(30, 6, 1, 10, 'Memo X Zyder', 'memoxzyder.jpg'),
(31, 6, 1, 9, 'Memo X Purguist', 'memoxpurguist.jpg'),
(32, 6, 7, 8, 'Sans X Mike', 'sansxmike.jpg'),
(33, 6, 22, 3, 'Dai X Many', 'daixmany.jpg'),
(34, 6, 3, 2, 'Many X Mylo', 'manyxmylo.jpg'),
(35, 7, 0, 0, 'Manuxs', 'manuxs.jpg'),
(36, 7, 4, 4, 'Novand', 'novand.jpg'),
(37, 7, 1, 1, 'Memo', 'memo.jpg'),
(38, 7, 2, 2, 'Mylo', 'mylo.jpg'),
(39, 7, 9, 9, 'Purguist', 'purguist.jpg'),
(40, 8, 8, 8, 'Serie de Minecraft de Mike', 'serie_mike.jpg'),
(41, 8, 0, 0, 'Skyland Origins', 'skyland_origins.png'),
(42, 8, 1, 1, 'Evento de Minecraft Halloween', 'halloween_memo.jpg'),
(43, 8, 7, 8, 'Boda de Sans y Mike', 'skyland_boda.jpg'),
(44, 8, 0, 0, 'Chafafans 2', 'chafafans2.png'),
(45, 9, 10, 10, 'Zyder - Amongus ???', 'zyder.jpg'),
(46, 9, 1, 1, 'Memo - Apestate', 'memo.jpg'),
(47, 9, 5, 5, 'Kuser - Hola vaquitas', 'kuser.jpg'),
(48, 9, 2, 2, 'Mylo - Chupa chupa', 'mylo.jpg'),
(49, 9, 0, 0, 'Manuxs - Apartate beyaco', 'manuxs.jpg'),
(50, 10, 7, 7, 'Sans', 'sans.jpg'),
(51, 10, 2, 2, 'Mylo', 'mylo.jpg'),
(52, 10, 11, 11, 'Osmar', 'osmar.jpg'),
(53, 10, 4, 4, 'Novand', 'novand.jpg'),
(54, 10, 10, 10, 'Zyder', 'zyder.jpg'),
(55, 11, 1, 1, 'Memo Golum', 'memo_golum.png'),
(56, 11, 1, 1, 'Memo Padre', 'memo_padre.png'),
(57, 11, 1, 1, 'Memo Viejo', 'memo_viejo.png'),
(58, 11, 1, 1, 'Memo Studios', 'memo_studios.png'),
(59, 11, 1, 1, 'Memo Borracho', 'memo_borracho.png'),
(60, 12, 0, 0, 'Fanart 1', 'fanart1.jpg'),
(61, 12, 0, 0, 'Fanart 2', 'fanart2.jpg'),
(62, 12, 0, 0, 'Fanart 3', 'fanart3.jpg'),
(63, 12, 0, 0, 'Fanart 4', 'fanart4.jpg'),
(64, 12, 0, 0, 'Fanart 5', 'fanart5.jpg'),
(65, 13, 10, 10, 'Zyder', 'zyder.jpg'),
(66, 13, 7, 7, 'Sans', 'sans.jpg'),
(67, 13, 8, 8, 'Mike', 'mike.jpg'),
(68, 13, 6, 6, 'Noah', 'noah.jpg'),
(69, 13, 4, 4, 'Novand', 'novand.jpg'),
(70, 14, 1, 1, 'Memo', 'memo.jpg'),
(71, 14, 5, 5, 'Kuser', 'kuser.jpg'),
(72, 14, 2, 2, 'Mylo', 'mylo.jpg'),
(73, 14, 20, 20, 'Shae', 'shae.jpg'),
(74, 14, 8, 8, 'Mike', 'mike.jpg'),
(75, 15, 9, 9, 'Purguist', 'purguist.jpg'),
(76, 15, 0, 0, 'Manuxs', 'manuxs.jpg'),
(77, 15, 4, 4, 'Novand', 'novand.jpg'),
(78, 15, 10, 10, 'Zyder', 'zyder.jpg'),
(79, 15, 8, 8, 'Mike', 'mike.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `icon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `icon`) VALUES
(111, 'manuelarotinco@gmail.com', 'https://cdn.discordapp.com/avatars/712691418581172326/2d8344c51e2f76255f1d24fed2120416.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votos`
--

CREATE TABLE `votos` (
  `id` int(11) NOT NULL,
  `idVotante` bigint(20) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `idNominado1` int(11) NOT NULL,
  `idNominado2` int(11) NOT NULL,
  `idNomCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `votos`
--

INSERT INTO `votos` (`id`, `idVotante`, `idCategoria`, `idNominado1`, `idNominado2`, `idNomCategoria`) VALUES
(1, 111, 0, 4, 4, 0),
(2, 111, 2, 1, 1, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nominados`
--
ALTER TABLE `nominados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nominadoscategoria`
--
ALTER TABLE `nominadoscategoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoriaID` (`idCategoria`),
  ADD KEY `nominado1ID` (`idNominado1`),
  ADD KEY `nominado2ID` (`idNominado2`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votanteID` (`idVotante`),
  ADD KEY `nomCatID` (`idNomCategoria`),
  ADD KEY `catID` (`idCategoria`),
  ADD KEY `nom1ID` (`idNominado1`),
  ADD KEY `nom2ID` (`idNominado2`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `votos`
--
ALTER TABLE `votos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nominadoscategoria`
--
ALTER TABLE `nominadoscategoria`
  ADD CONSTRAINT `categoriaID` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `nominado1ID` FOREIGN KEY (`idNominado1`) REFERENCES `nominados` (`id`),
  ADD CONSTRAINT `nominado2ID` FOREIGN KEY (`idNominado2`) REFERENCES `nominados` (`id`);

--
-- Filtros para la tabla `votos`
--
ALTER TABLE `votos`
  ADD CONSTRAINT `catID` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `nom1ID` FOREIGN KEY (`idNominado1`) REFERENCES `nominados` (`id`),
  ADD CONSTRAINT `nom2ID` FOREIGN KEY (`idNominado2`) REFERENCES `nominados` (`id`),
  ADD CONSTRAINT `nomCatID` FOREIGN KEY (`idNomCategoria`) REFERENCES `nominadoscategoria` (`id`),
  ADD CONSTRAINT `votanteID` FOREIGN KEY (`idVotante`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
