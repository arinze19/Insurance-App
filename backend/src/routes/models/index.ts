/**
 * @typedef {object} Policy
 * @property {string} id
 * @property {Customer} customer
 * @property {Provider.name} provider
 * @property {InsuranceType.name} InsuranceType
 * @property {PolicyStatus.name} status
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {Date} createdAt
 */

/**
 * @typedef {object} Customer
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {Date} dateOfBirth
 */

/**
 * @typedef {object} Family 
 * @property {number} id
 * @property {string} name
 * @property {Policy.id} policyId
 */

/**
 * @typedef {object} FamilyAdd
 * @property {string} name
 */

/**
 * @typedef {object} Provider
 * @property {string} name - enum:BERMER,TK,AOK,DAK
 */

/**
 * @typedef {object} InsuranceType
 * @property {string} name enum:HEALTH,LIABILITY,HOUSEHOLD
 */

/**
 * @typedef {object} PolicyStatus
 * @property {string} name enum:ACTIVE,PENDING
 */

/**
 * @typedef {object} ErrorResponse
 * @property {string} response
 * @property {ErrorMessage} error
 */

/**
 * @typedef {object} ErrorMessage
 * @property {string} type
 * @property {string} path
 * @property {number} statusCode
 * @property {string} message
 */
