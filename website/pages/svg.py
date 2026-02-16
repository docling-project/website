from pdb import line_prefix
from pyjsx import JSX, jsx  # type: ignore


def _tag(name: str):
    def factory(*, children: list[JSX] = [], **props) -> JSX:
        return jsx(name, props, children)

    return factory


circle = _tag("circle")
defs = _tag("defs")
g = _tag("g")
image = _tag("image")
line = _tag("line")
marker = _tag("marker")
path = _tag("path")
polyline = _tag("polyline")
rect = _tag("rect")
text = _tag("text")
