/**
 * TypeDefs
 * ----
 */

/**
 * @typedef {("orders"|"customers")} Types
 */

/**
 * @typedef {{rule: String, value: *, condition: String, type: RuleTypes,}} Rule
 */

/**
 * @typedef {("rule"|"value"|"condition")} RuleKeys
 */

/**
 * @typedef {("date"|"number"|"keyword"|"multi_select"|"boolean_select"|"country_region_select")} RuleTypes
 */

/**
 * @typedef {Object} QueryBuilderType
 * @property {String} title
 * @property {Array.<{id: Number, rules: Array.<Rule>}>} segments
 */

/**
 * @typedef {Object} ObjectFromType
 * @property {QueryBuilderType} object
 * @property {Function} handlerFunction
 */

/**
 * Returns appropriate Object given a type
 * @typedef {(type: Types) => ObjectFromType} GetObjectFromType
 */

/**
 * Change any object within a Segment
 * @typedef {(type: Types, index: Number, key: String, value: *)} ChangeSegmentHandler
 */

/**
 * Append new Segment into a given type
 * @typedef {(type: Types)} NewSegmentHandler
 */

/**
 * Depending on the parameters provided this either deletes a Segment or a Rule
 * @typedef {(type: Types, segmentIndex: Number, ruleIndex: Number)} DeleteHandler
 */

/**
 * Change Any Object within a Rule
 * @typedef {(type: Types, segmentIndex: Number, ruleIndex: Number, key: RuleKeys, value: *)} ChangeRuleHandler
 */

/**
 * Append New Rule to a given ObjectType's segments
 * @typedef {(type: Types, segmentIndex: Number)} NewRuleHandler
 */

/**
 * @typedef {Object} QueryBuilderContext
 * @property {QueryBuilderType} orders
 * @property {QueryBuilderType} customers
 * @property {GetObjectFromType} getObjectFromType
 * @property {ChangeSegmentHandler} handleSegmentChange
 * @property {NewSegmentHandler} handleNewSegment
 * @property {DeleteHandler} handleDelete
 * @property {ChangeRuleHandler} handleRuleChange
 * @property {NewRuleHandler} handleNewRule
 */
