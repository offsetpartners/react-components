/**
 * TypeDefs
 * ----
 */

/**
 * Inputs
 * @typedef {{label: String, type: RuleTypes, values: Any|Null, keys: String[]|Null} QueryBuilderInput
 */

/**
 * Types
 * @typedef {("orders"|"customers")} Types
 */

/**
 * Rule
 * @typedef {{rule: String, value: *, condition: String, type: RuleTypes}} Rule
 */

/**
 * RuleKeys
 * @typedef {("rule"|"value"|"condition")} RuleKeys
 */

/**
 * RuleTypes
 * @typedef {("date"|"number"|"keyword"|"multi_select"|"boolean_select"|"country_region_select")} RuleTypes
 */

/**
 * QueryBuilderType
 * @typedef {Object} QueryBuilderType
 * @property {String} title
 * @property {Array.<{id: Number, rules: Array.<Rule>}>} segments
 */

/**
 * ObjectFromType
 * @typedef {Object} ObjectFromType
 * @property {Object} inputs
 * @property {QueryBuilderType} object
 * @property {Function} handlerFunction
 */

/**
 * GetObjectFromType
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
 * @typedef {{type: String, key: String|Null, value: Any|Null, from: Number|Date|Null, to: Number|Date|Null}} ElasticSearchQuery
 */

/**
 * On Save handler
 * @typedef {(type: Type, setResult: Function, onSave: Function) => void} SaveHandler
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
 * @property {SaveHandler} handleSave
 */
