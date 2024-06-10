const blocks = [
    [
        [
            [1, 1],
            [1, 1]
        ]
    ],
    [
        [
            [2, 2, 2, 2]
        ],
        [
            [2],
            [2],
            [2],
            [2]
        ]
    ],
    [
        [
            [3, 3, 0],
            [0, 3, 3]
        ],
        [
            [0, 3],
            [3, 3],
            [3, 0]
        ]
    ],
    [
        [
            [0, 4, 4],
            [4, 4, 0]
        ],
        [
            [4, 0],
            [4, 4],
            [0, 4]
        ]
    ],
    [
        [
            [5, 0, 0],
            [5, 5, 5]
        ],
        [
            [5, 5],
            [5, 0],
            [5, 0]
        ],
        [
            [5, 5, 5],
            [0, 0, 5]
        ],
        [
            [0, 5],
            [0, 5],
            [5, 5]
        ]
    ],
    [
        [
            [0, 0, 6],
            [6, 6, 6]
        ],
        [
            [6, 6],
            [0, 6],
            [0, 6]
        ],
        [
            [6, 6, 6],
            [6, 0, 0]
        ],
        [
            [6, 0],
            [6, 0],
            [6, 6]
        ]
    ],
    [
        [
            [0, 7, 0],
            [7, 7, 7]
        ],
        [
            [7, 7, 7],
            [0, 7, 0]
        ],
        [
            [7, 0],
            [7, 7],
            [7, 0]
        ],
        [
            [0, 7],
            [7, 7],
            [0, 7]
        ]
    ],
    [
        [
            [0, 8, 0],
            [8, 8, 8],
            [0, 8, 0]
        ]
    ],
    [
        [
            [9]
        ]
    ],
    [
        [
            [10, 10]
        ],
        [
            [10],
            [10]
        ]
    ],
    [
        [
            [11, 11],
            [11, 0],
        ],
        [
            [11, 11],
            [0, 11],
        ],
        [
            [0, 11],
            [11, 11],
        ],
        [
            [11, 0],
            [11, 11],
        ],
    ],
];

var blocksSize = new Array(blocks.length).fill(0);
//count the size of every block in blocks
for (let i = 0; i < blocks.length; ++i) {
    for (let y = 0; y < blocks[i][0].length; ++y) {
        for (let x = 0; x < blocks[i][0][y].length; ++x) {
            if (blocks[i][0][y][x]) ++blocksSize[i];
        }
    }
}

let m, n, a, l, res;

function Solve(arr, num) {
    res = [];
    m = arr.length;
    n = arr[0].length;

    a = new Array(m);
    for (let i = 0; i < m; ++i) {
        a[i] = arr[i].map(x => x);
    }

    l = num.map(x => x);

    dfs(0);

    return res;
}

function canPlaceBlock(x, y, b, d) {
    const pat = blocks[b][d];
    let offset = 0;
    while (!pat[0][offset]) ++offset;
    y -= offset;
    if (y < 0) return false;
    for (let i = 0; i < pat.length; ++i) {
        for (let j = 0; j < pat[0].length; ++j) {
            if (pat[i][j] && (x + i >= m || y + j >= n || a[x + i][y + j] !== -1)) return false;
        }
    }
    return true;
}

function placeBlock(x, y, b, d, v) {
    const pat = blocks[b][d];
    let offset = 0;
    while (!pat[0][offset]) ++offset;
    y -= offset;
    for (let i = 0; i < pat.length; ++i) {
        for (let j = 0; j < pat[0].length; ++j) {
            if (pat[i][j]) a[x + i][y + j] = v;
        }
    }
}

function dfs(p, max_len = 500000) {
    if (p === m * n) {
        const x = new Array(m);
        for (let i = 0; i < m; ++i) {
            x[i] = a[i].map(x => x);
        }
        res.push(x);
        if (res.length >= max_len) {
            alert('方案数太多，仅计算前' + max_len + '种。减少一些方块吧~');
            return true;
        }
        return false;
    }
    const x = Math.floor(p / n), y = p % n;
    if (a[x][y] !== -1) {
        if (dfs(p + 1)) return true;
        return false;
    }
    for (let b = 0; b < blocks.length; ++b) {
        if (!l[b]) continue;
        for (let d = 0; d < blocks[b].length; ++d) {
            if (!canPlaceBlock(x, y, b, d)) continue;
            placeBlock(x, y, b, d, b + 1);
            --l[b];
            if (dfs(p + 1)) return true;
            ++l[b];
            placeBlock(x, y, b, d, -1);
        }
    }
    return false;
}

