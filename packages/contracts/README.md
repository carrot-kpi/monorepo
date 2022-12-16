# Carrot v1 contracts

This repo contains the smart contracts for Carrot v1, a platform that enables
easy, hassle-free and efficient incentivization, rewarding what really matters
in a capital efficient way.

Incentivization is enabled through flexible and collateralized KPI tokens, smart
contracts running on any EVM-compatible chain. The collateral unlocking is tied
to a series of conditions (finalized through results reported on-chain by
dedicated oracles), and unlocked depending on how those conditions resolve. The
collateral can either become redeemable by KPI token holders if the KPI token
creator's goal is reached, or sent back to the creator if it's not, achieving
capital efficient incentivization in the process (instead of just throwing money
to people to reach a goal, the money is unlocked only if a goal has been either
partially or fully reached).

A Carrot campaign typically consists of a party defining a goal (e.g. will this
pool on Swapr have more than x USD liquidity by date y, will the USD price of x
be y or more USD by date z, etc etc), and then representing this goal on-chain
through the creation of KPI tokens linked to the condition itself through one or
more oracle(s) and a configuration that is specific to the type of KPI token one
wants to create (more on this later).

The created KPI token(s), which can take on any form (ERC20, ERC721, ERC155 and
more) or any unlocking logic implementable on the EVM (more info on this later),
can then be distributed to the parties whose efforts can realistically have the
most impact on reaching the goal. The parties then know that if the goal is
reached, they'll receive a reward for their service, while if the goal is not
reached, the KPI tokens will expire and they'll get either nothing or a smaller
amount of rewards, with the KPI token creator getting back all or most of the
collateral.

In short, this is what Carrot v1 is about.

## KPI token and oracle templates and managers

Carrot v1 is designed with flexibility in mind. The maximum amount of
flexibility is achieved by allowing third parties to create their own KPI token
and oracle templates. Any party can code the functionality they want/need in
Carrot v1 and use it freely, putting almost no limits on creativity.

This is mainly achieved using 2 contracts: `KPITokensManager` and
`OraclesManager`. These contracts act as a registry for both KPI token and
oracle templates, and at the same time can instantiate specific templates (using
ERC-1167 clones to maximize gas efficiency).

Each of these managers support template addition, removal, upgrade, update and
instantiation, as well as some readonly functions to query templates' state.

Most of these actions are protected and can only be performed by specific
entities in the platform. In particular, addition, removal, upgrade and update
can only be performed by the manager contract's owner (governance), while
template instantiation can only be initiated by the `KPITokensFactory`.

Carrot v1 comes out of the box with powerful KPI token and oracle templates,
with the goal of encouraging the community to come up with additional use cases
that can also lead to custom-made products based off of Carrot v1's platform.

## KPITokensFactory

The KPI tokens factory is ideally the contract with which KPI token creators
will interact the most, and the glue of the overall architecture. Its most
important function is `createToken`, which takes in 4 parameters, `_id`,
`_description`, `_initializationData` and `_oraclesInitializationData`. The
factory is simply in charge of initializing the KPI token campaign overall,
along with the oracles eventually connected to it, and collecting an arbitrary
protocol fee in the process. The logic for these functions are defined by the
KPI token template, and are fully extensible to allow for custom behavior.

Explanation of the input parameters follows:

- `_id`: an `uint` telling the factory which KPI token template must be used.
- `_description`: a `string` describing what the KPI token is about (the goals,
  how they can be reached, and eventually info about how to answer any attached
  oracles, if the oracles are crowdsourced). In order to save on gas fees, it is
  _highly_ advisable to upload a text file to IPFS and pass in a CID. A JSON
  schema specification for how the description has to look like is a current
  work in progress, the idea being that if the description of a KPI token does
  not conform to the JSON schema, it won't be shown in the official frontend
  operated by DXdao.
- `_initializationData`: ABI-encoded KPI token initialization data specific to
  the template that the user wants to use. To know what data to use and how to
  encode it, have a look at the code for the template you want to use, in
  particular to the `initialize` function. In the future, this will be made
  simpler and a KPI token creation flow will be added in the frontend.
- `_oraclesInitializationData`: ABI-encoded oracles data specific to the
  instantiated template. This data is used by the KPI token template to
  instantiate any oracles needed to report goals' data back on-chain. To know
  what data to use and how to encode it, have a look at the code for the
  template you want to use, in particular at the `initializeOracles` function.

## Implementing a KPI token template

A KPI token template can be defined by simply implementing the `IKPIToken`
interface. The functions that must be overridden are:

- `initialize`: this function is called by the factory while initializing the
  KPI token and contains all the initialization logic (collateral transfers,
  state setup, KPI token minting and transfer to any eligible party etc). 4
  input parameters are passed in by the factory: `_creator`, which is the
  address of the account creating the KPI token, `_template` which is a struct
  containing a snapshot of the used template spec at creation-time,
  `_description`, which is a string the contents of which describe what the KPI
  token is about (see `_description` in the above list too), and `_data`, which
  contains any parameters/configuration required by the initialization function
  in an ABI-encoded fashion.
- `initializeOracles`: oracle(s) initialization is performed in this function.
  The `_oraclesManager` contract address is passed in as an input alongside
  `_data`, the arbitrary ABI-encoded data needed to instantiate the oracles.
- `collectProtocolFees`: protocol fees collection is implemented in this
  function. The logic surrounding protocol fee collection is heavily
  implementation-dependent and should be discussed with DXdao/Carrot guild
  before a proposal to add the template is submitted. Additionally, the idea
  will eventually be to let KPI token template developers keep part of the fee
  as a thank you for their much, much appreciated service to the community.
- `finalize`: finalization logic is implemented here. This function should only
  be callable by the oracles associated with the token. Once all the oracles
  have reported their final results, logic to properly allocate the collaterals
  (either to the KPI token holders or the KPI token creator) must be implemented
  accordingly. Any non-redeemable collateral should at this point be sent back
  to the KPI token creator
- `redeem`: this is the function KPI token holders call to redeem the collateral
  they have earned (if any was unlocked by `finalize`). This function should
  ideally (but not necessarily) burn the user-held KPI token(s) in exchange for
  the collateral.
- `finalized`: a view function that helps understanding if the KPI token is in a
  finalized state or not.
- `protocolFee`: a view function to get a fee breakdown for the KPI token
  creation.

In general, a good place to have a look at to get started with KPI token
development is the
[`ERC20KPIToken`](https://github.com/carrot-kpi/erc20-kpi-token-template) (talk
is cheap, show me the code).
