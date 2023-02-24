# Shared State

Shared state is a library meant to provide shared state (duh) between Carrot's
host app and templates. Shared state might include various preferences (and
helper params such as custom oracle or KPI token template base URLs to aid in
local development) or anything else that's deemed to be useful to share between
host and templates.

The library is made to be as focused in scope as possible, and it's separated
from other libraries to have fine grained control on what exactly gets shared
with module federation across microfrontends. The library used for state
management is Redux, which is framework agnostic and so supports various
different frontend technologies.

The Redux state can be consumed using connectors exported by the library. The
first and only implemented connector is for React and uses React Redux with a
custom context shared between the host frontend and the templates.
