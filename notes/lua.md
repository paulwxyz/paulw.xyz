# Lua Programming Language

## Lua 5.4 C API


## Lua 5.4 Bytecode

> [!note]
> These are **unstable** and may differ in different versions of the language.
> They are not part of the language specification but an implementation detail, which in this case is the reference implementation.

> [!note]
> The reference implementation used to have a stack based but now uses a register based VM similar to how modern real computer architectures.

The instructions are 32 bits wide; every instruction has an opcode that takes up 7 bits, which leaves out 25 bits for the addresses and values.

The instructions work with three register referred to as: A, B, C; each are of length 8 bits.

<table>
<thead>
<tr>
<th></th>
<th>31</th><th>...</th><th>24</th><th>23</th><th>...</th><th>16</th><th>15</th><th>14</th><th>...</th><th>7</th><th>6</th><th>...</th><th>0</th>
</tr>
</thead>
<tr>
<td>iABC</td>
<td colspan='3' style='text-align:center'>C (8 bits)</td>
<td colspan='3' style='text-align:center'>B (8 bits)</td>
<td style='text-align:center'>k (1 bit)</td>
<td colspan='3' style='text-align:center'>A (8 bits)</td>
<td colspan='3' style='text-align:center'>OP (7 bits)</td>
</tr>
<tr>
<td>iABx</td>
<td colspan='7' style='text-align:center'>B (17 bits)</td>
<td colspan='3' style='text-align:center'>A (8 bits)</td>
<td colspan='3' style='text-align:center'>OP (7 bits)</td>
</tr>
<tr>
<td>iAsBx</td>
<td colspan='7' style='text-align:center'>signed B 17 bits)</td>
<td colspan='3' style='text-align:center'>A (8 bits)</td>
<td colspan='3' style='text-align:center'>OP (7 bits)</td>
</tr>
<tr>
<td>iAx</td>
<td colspan='10' style='text-align:center'>Ax (25 bits)</td>
<td colspan='3' style='text-align:center'>OP (7 bits)</td>
</tr>
<tr>
<td>sJ</td>
<td colspan='10' style='text-align:center'>signed jump address (25 bits)</td>
<td colspan='3' style='text-align:center'>OP (7 bits)</td>
</tr>
</table>

```lua
-- arithmetic to calculate the lengths used from https://www.lua.org/source/5.4/lopcodes.h.html
A = 8
B = 8
C = 8
Bx = A + B + 1  -- 17
Ax = A + Bx     -- 25
sJ = A + Bx     -- 25
```
This page contains excerpts from Lua's source code which is the copyright of Lua.org, PUC-Rio and is licensed under the MIT License.
[lua.org/license.html](https://www.lua.org/license.html)
