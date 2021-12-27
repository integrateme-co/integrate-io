const express = require("express");
const { postFromDev } = require("../controller/postFromDev.controller");
const { postFromHash } = require("../controller/postFromHash.controller");
const { postFromMedium } = require("../controller/postFromMedium.controller");
const router = express.Router();
const {scheduleDevTo} = require('../controller/scheduleDevTo.controller');

/**
 * @swagger
 * /schedule:
 *  post:
 *      summary: Schedule a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ScheduledPost'
 *      responses:
 *          201:
 *              description: Your post has been succesfully scheduled
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              response:
 *                                  type: string
 */
router.post("/schedule", scheduleDevTo);

/**
 * @swagger
 * /dev:
 *  post:
 *      summary: Post From Dev to Medium and/or Hashnode
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DevPost'
 *      responses:
 *          400:
 *              description: An error occured while posting from Dev.to
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Error:
 *                                  type: string
 *          201:
 *              description: Your post has been succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 */
router.post('/dev', postFromDev);

/**
 * @swagger
 * /medium:
 *  post:
 *      summary: Post From Medium to Dev and/or Hashnode
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MediumPost'
 *      responses:
 *          400:
 *              description: An error occured while posting from Medium
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Error:
 *                                  type: string
 *          201:
 *              description: Your post has been succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 */
router.post('/medium', postFromMedium);


/**
 * @swagger
 * /hash:
 *  post:
 *      summary: Post From Hashnode to Dev and/or Medium
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MediumPost'
 *      responses:
 *          400:
 *              description: An error occured while posting from Hashnode
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Error:
 *                                  type: string
 *          201:
 *              description: Your post has been succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 */
router.post('/hash', postFromHash);

module.exports = router;