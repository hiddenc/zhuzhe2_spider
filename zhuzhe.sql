/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3308
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3308
 Source Schema         : zhuzhe

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 05/05/2018 17:18:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for data
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `housename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `usetype` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `buildID` int(11) NOT NULL,
  `floorNum` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `projectID` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `buildArea` float NOT NULL,
  `indoorArea` float NOT NULL,
  `shareArea` float NOT NULL,
  `beiAnPrice` float NOT NULL,
  `beiAnAllPrice` float NOT NULL,
  `dealPrice` float NOT NULL,
  `dealAllPrice` float NOT NULL,
  `projectName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `buildName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dealDate` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
