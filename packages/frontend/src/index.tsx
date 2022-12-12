// entrypoint is loaded asynchronously to allow for non-eager
// module federation dependency loading. This results in a
// lighter initial chunk, faster loading times and all those
// good things

import("./bootstrap");
