# #!/usr/bin/env bash

# for i in *.in; do
#     node part-1 "$i" > $(basename "$i" .in).out.temp
#     diff $(basename "$i" .in).out.temp $(basename "$i" .in).out
#     # rm $(basename "$i" .in).out.temp
# done