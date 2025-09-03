// data/sampleData.js - Sample data for the application
export const sampleData = {
  categories: [
    {
      id: 'c1',
      name: 'DSA',
      color: 'bg-blue-500',
      icon: '🧮',
      tasks: [
        {
          id: 't1',
          title: 'Solve 5 Array Problems',
          date: '2025-08-31',
          completed: false,
          description: 'Focus on sliding window and two-pointer techniques',
          priority: 'high',
          resources: [
            {
              type: 'practice',
              title: 'LeetCode Array Problems',
              url: 'https://leetcode.com/tag/array/',
              icon: '💻'
            },
            {
              type: 'tutorial',
              title: 'Array Algorithms Guide',
              url: 'https://www.geeksforgeeks.org/array-data-structure/',
              icon: '📚'
            }
          ],
          estimatedTime: 120,
          tags: ['arrays', 'sliding-window', 'two-pointers']
        },
        {
          id: 't2',
          title: 'Practice Binary Search',
          date: '2025-09-01',
          completed: true,
          description: 'Master binary search variations',
          priority: 'medium',
          resources: [
            {
              type: 'practice',
              title: 'Binary Search Problems',
              url: 'https://leetcode.com/tag/binary-search/',
              icon: '💻'
            }
          ],
          estimatedTime: 90,
          tags: ['binary-search', 'algorithms']
        },
        {
          id: 't5',
          title: 'Study Dynamic Programming',
          date: '2025-08-31',
          completed: false,
          description: 'Learn DP patterns and memoization',
          priority: 'high',
          resources: [
            {
              type: 'tutorial',
              title: 'DP Patterns Guide',
              url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews',
              icon: '📖'
            },
            {
              type: 'video',
              title: 'DP Video Series',
              url: 'https://www.youtube.com/playlist?list=PLrmLmBdmIlpsHaNTPP_jHHDx_os9ItYXr',
              icon: '🎥'
            }
          ],
          estimatedTime: 180,
          tags: ['dynamic-programming', 'memoization']
        }
      ]
    },
    {
      id: 'c2',
      name: 'System Design',
      color: 'bg-purple-500',
      icon: '🏗️',
      tasks: [
        {
          id: 't3',
          title: 'Study Load Balancers',
          date: '2025-08-31',
          completed: false,
          description: 'Understand different load balancing strategies',
          priority: 'medium',
          resources: [
            {
              type: 'article',
              title: 'Load Balancing Concepts',
              url: 'https://aws.amazon.com/what-is/load-balancing/',
              icon: '📄'
            },
            {
              type: 'course',
              title: 'System Design Course',
              url: 'https://www.educative.io/courses/grokking-the-system-design-interview',
              icon: '🎓'
            }
          ],
          estimatedTime: 120,
          tags: ['load-balancing', 'scalability']
        }
      ]
    },
    {
      id: 'c3',
      name: 'Mock Interviews',
      color: 'bg-green-500',
      icon: '🎯',
      tasks: [
        {
          id: 't4',
          title: 'Practice with peer',
          date: '2025-09-02',
          completed: false,
          description: 'Focus on behavioral questions and coding',
          priority: 'high',
          resources: [
            {
              type: 'platform',
              title: 'Pramp - Mock Interviews',
              url: 'https://www.pramp.com/',
              icon: '👥'
            },
            {
              type: 'guide',
              title: 'Interview Prep Guide',
              url: 'https://www.crackingthecodinginterview.com/',
              icon: '📋'
            }
          ],
          estimatedTime: 60,
          tags: ['interview', 'behavioral', 'coding']
        }
      ]
    }
  ]
};