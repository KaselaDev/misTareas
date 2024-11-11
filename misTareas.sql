-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-11-2024 a las 07:55:19
-- Versión del servidor: 8.0.39-0ubuntu0.24.04.2
-- Versión de PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `misTareas`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`KaselaSQL`@`localhost` PROCEDURE `deleteTask` (IN `param_idTarea` INT)   UPDATE `tareas` SET `deleted` = CURRENT_DATE WHERE idTarea = param_idTarea$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTareasByID` (IN `param_id` INT(2))   SELECT `idTarea`, `idUsuario`, `titulo`, `contenido`, `color`, `star`, `created`, `modified`, `deleted` FROM `tareas` WHERE tareas.idUsuario = param_id AND tareas.deleted IS NULL ORDER BY tareas.star DESC, tareas.modified DESC$$

CREATE DEFINER=`KaselaSQL`@`localhost` PROCEDURE `setTask` (IN `param_titulo` TEXT, IN `param_contenido` TEXT)   INSERT INTO `tareas`(`idTarea`, `idUsuario`, `titulo`, `contenido`) VALUES (NULL,2, param_titulo , param_contenido )$$

CREATE DEFINER=`KaselaSQL`@`localhost` PROCEDURE `toggleStar` (IN `param_idTarea` INT)   BEGIN
    DECLARE currentStar INT$$

CREATE DEFINER=`KaselaSQL`@`localhost` PROCEDURE `updateTask` (IN `param_idTarea` INT, IN `param_contenido` TEXT)   UPDATE `tareas` SET `contenido` = param_contenido WHERE idTarea = param_idTarea$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `idTarea` int NOT NULL,
  `idUsuario` int DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text,
  `color` varchar(20) DEFAULT NULL,
  `star` tinyint(1) DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`idTarea`, `idUsuario`, `titulo`, `contenido`, `color`, `star`, `created`, `modified`, `deleted`) VALUES
(1, 1, 'Comprar víveres', 'Comprar leche, pan y huevos', 'blue', 1, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(2, 1, 'Revisar correos', 'Responder correos importantes', 'green', 0, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(3, 1, 'Estudiar React', 'Practicar hooks y componentes', 'yellow', 1, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(4, 1, 'Entrenamiento', 'Ir al gimnasio a las 7pm', 'red', 0, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(5, 1, 'Cita médica', 'Consulta de revisión anual', 'purple', 1, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(6, 2, 'Llamar a mamá', 'Hablar con mamá para saber cómo está', 'pink', 0, '2024-10-28 18:15:09', '2024-11-11 07:29:04', '2024-11-11 03:00:00'),
(7, 2, 'Proyecto final', 'Trabajar en el proyecto final de curso', 'orange', 0, '2024-10-28 18:15:09', '2024-11-11 07:29:26', '2024-11-11 03:00:00'),
(8, 2, 'Leer libro', 'Leer el capítulo 3 de mi libro favorito', 'blue', 1, '2024-10-28 18:15:09', '2024-11-11 07:28:22', NULL),
(9, 2, 'Organizar habitación', 'Limpiar y organizar la habitación', 'green', 0, '2024-10-28 18:15:09', '2024-11-11 01:43:38', NULL),
(10, 2, 'Paseo con amigos', 'Ir al parque con amigos el sábado', 'yellow', 0, '2024-10-28 18:15:09', '2024-11-11 01:37:21', NULL),
(11, 3, 'Preparar presentación', 'Crear diapositivas para la reunión', 'red', 1, '2024-10-28 18:15:09', '2024-11-11 07:20:03', '2024-11-11 03:00:00'),
(12, 3, 'Visitar al dentista', 'Cita para revisión dental', 'purple', 0, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(13, 3, 'Hacer ejercicio', 'Salir a correr en la mañana', 'orange', 1, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(14, 3, 'Comprar libros', 'Comprar libros de ciencia ficción', 'blue', 1, '2024-10-28 18:15:09', '2024-11-11 07:19:09', '2024-11-03 07:19:05'),
(15, 3, 'Cocinar cena', 'Preparar una cena especial para la familia', 'green', 1, '2024-10-28 18:15:09', '2024-10-28 18:15:09', NULL),
(16, 2, 'Llamar a mamá', 'Hablar con mamá para saber cómo está la mama', '#00ADEF', 0, '2024-10-30 23:40:03', '2024-11-11 07:14:31', NULL),
(17, 2, 'Proyecto final', 'Trabajar en el proyecto final de curso', '#32CD32', 1, '2024-10-30 23:40:03', '2024-11-11 07:22:40', '2024-11-11 03:00:00'),
(18, 2, 'Leer libro', 'Leer el capítulo 3 de mi libro favorito', '#FFD700', 0, '2024-10-30 23:40:03', '2024-11-11 07:27:37', '2024-11-11 03:00:00'),
(19, 2, 'Organizar habitación', 'Limpiar y organizar la habitación', '#FF4500', 0, '2024-10-30 23:40:03', '2024-11-11 01:43:40', NULL),
(20, 2, 'Paseo con amigos', 'Ir al parque con amigos el sábado', '#8A2BE2', 0, '2024-10-30 23:40:03', '2024-11-11 01:43:42', NULL),
(21, 2, 'Hacer ejercicio', 'Realizar una sesión de ejercicios', '#FF69B4', 0, '2024-10-30 23:40:03', '2024-11-11 01:43:42', NULL),
(22, 2, 'Estudiar matemáticas', 'Revisar el tema de álgebra para el examen', '#4682B4', 0, '2024-10-30 23:40:03', '2024-11-11 01:43:41', NULL),
(23, 2, 'Ir de compras', 'Comprar alimentos para la semana', '#228B22', 0, '2024-10-30 23:40:03', '2024-11-11 01:43:44', NULL),
(24, 2, 'Cita médica', 'Ir a la cita con el doctor a las 4pm', '#DC143C', 0, '2024-10-30 23:40:03', '2024-11-11 01:43:45', NULL),
(25, 2, 'Aprender SQL', 'Practicar consultas SQL en la base de datos', '#8B0000', 1, '2024-10-30 23:40:03', '2024-11-11 07:51:41', NULL),
(26, 2, 'param_titulo', 'param_contenido', NULL, 0, '2024-11-11 07:48:05', '2024-11-11 07:49:16', '2024-11-11 03:00:00'),
(27, 2, 'dd', 'dddd', NULL, 0, '2024-11-11 07:48:53', '2024-11-11 07:51:22', '2024-11-11 03:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `username`, `email`, `password`, `avatar`, `rol`, `created`, `modified`, `deleted`) VALUES
(1, 'johndoe', 'johndoe@example.com', 'password123', 'https://robohash.org/1', 'admin', '2024-10-28 18:15:08', '2024-10-28 18:15:08', NULL),
(2, 'janedoe', 'janedoe@example.com', 'password456', 'https://robohash.org/2', 'user', '2024-10-28 18:15:08', '2024-10-28 18:15:08', NULL),
(3, 'mikesmith', 'mikesmith@example.com', 'password789', 'https://robohash.org/3', 'user', '2024-10-28 18:15:08', '2024-10-28 18:15:08', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `idTarea` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;