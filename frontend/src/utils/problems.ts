const problems = [
    {
        "id": 1,
        "title": "Two Sum",
        "description": "Find two numbers such that they add up to a specific target.",
        "input": {
            "nums": [2, 7, 11, 15],
            "target": 9
        },
        "expected_output": [0, 1]
    },
    {
        "id": 2,
        "title": "Add Two Numbers",
        "description": "Add two non-negative integers represented as linked lists.",
        "input": {
            "l1": [2, 4, 3],
            "l2": [5, 6, 4]
        },
        "expected_output": [7, 0, 8]
    },
    {
        "id": 3,
        "title": "Longest Substring Without Repeating Characters",
        "description": "Find the length of the longest substring without repeating characters.",
        "input": {
            "s": "abcabcbb"
        },
        "expected_output": 3
    },
    {
        "id": 4,
        "title": "Median of Two Sorted Arrays",
        "description": "Find the median of two sorted arrays.",
        "input": {
            "nums1": [1, 3],
            "nums2": [2]
        },
        "expected_output": 2.0
    },
    {
        "id": 5,
        "title": "Longest Palindromic Substring",
        "description": "Find the longest palindromic substring in a given string.",
        "input": {
            "s": "babad"
        },
        "expected_output": "bab"  // "aba" is also a valid output
    },
    {
        "id": 6,
        "title": "Zigzag Conversion",
        "description": "Convert a string into a zigzag pattern on a given number of rows.",
        "input": {
            "s": "PAYPALISHIRING",
            "numRows": 3
        },
        "expected_output": "PAHNAPLSIIGY"
    },
    {
        "id": 7,
        "title": "Reverse Integer",
        "description": "Reverse digits of an integer.",
        "input": {
            "x": 123
        },
        "expected_output": 321
    },
    {
        "id": 8,
        "title": "String to Integer (atoi)",
        "description": "Convert a string to an integer, following the rules of atoi.",
        "input": {
            "str": "   -42"
        },
        "expected_output": -42
    },
    {
        "id": 9,
        "title": "Palindrome Number",
        "description": "Determine whether an integer is a palindrome.",
        "input": {
            "x": 121
        },
        "expected_output": true
    },
    {
        "id": 10,
        "title": "Regular Expression Matching",
        "description": "Implement regular expression matching with support for '.' and '*'.",
        "input": {
            "s": "aab",
            "p": "c*a*b"
        },
        "expected_output": true
    }
];

export default problems;
