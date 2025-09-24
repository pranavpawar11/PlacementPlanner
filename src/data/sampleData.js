// data/sampleData.js - Sample data for the application
// export const sampleData = {
//   categories: [
//     {
//       id: 'c1',
//       name: 'DSA',
//       color: 'bg-blue-500',
//       icon: '🧮',
//       tasks: [
//         {
//           id: 't1',
//           title: 'Solve 5 Array Problems',
//           date: '2025-09-01',
//           completed: true,
//           description: 'Focus on sliding window and two-pointer techniques',
//           priority: 'high',
//           resources: [
//             {
//               type: 'practice',
//               title: 'LeetCode Array Problems',
//               url: 'https://leetcode.com/tag/array/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['arrays', 'sliding-window', 'two-pointers']
//         },
//         {
//           id: 't2',
//           title: 'Practice Binary Search',
//           date: '2025-09-02',
//           completed: true,
//           description: 'Master binary search variations',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Binary Search Problems',
//               url: 'https://leetcode.com/tag/binary-search/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['binary-search', 'algorithms']
//         },
//         {
//           id: 't5',
//           title: 'Study Dynamic Programming',
//           date: '2025-09-03',
//           completed: false,
//           description: 'Learn DP patterns and memoization',
//           priority: 'high',
//           resources: [
//             {
//               type: 'tutorial',
//               title: 'DP Patterns Guide',
//               url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews',
//               icon: '📖'
//             }
//           ],
//           estimatedTime: 180,
//           tags: ['dynamic-programming', 'memoization']
//         },
//         {
//           id: 't6',
//           title: 'Graph Algorithms Practice',
//           date: '2025-09-06',
//           completed: false,
//           description: 'BFS and DFS traversal problems',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Graph Problems',
//               url: 'https://leetcode.com/tag/graph/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['graph', 'bfs', 'dfs']
//         },
//         {
//           id: 't7',
//           title: 'Recursion Practice',
//           date: '2025-09-12',
//           completed: true,
//           description: 'Solve recursion-based problems',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Recursion Problems',
//               url: 'https://leetcode.com/tag/recursion/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['recursion', 'backtracking']
//         },
//         {
//           id: 't8',
//           title: 'Linked List Problems',
//           date: '2025-09-13',
//           completed: false,
//           description: 'Practice pointer manipulation',
//           priority: 'high',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Linked List Problems',
//               url: 'https://leetcode.com/tag/linked-list/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 60,
//           tags: ['linked-list', 'pointers']
//         },
//         {
//           id: 't9',
//           title: 'Tree Traversal Practice',
//           date: '2025-09-14',
//           completed: true,
//           description: 'Inorder, preorder, postorder traversals',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Tree Problems',
//               url: 'https://leetcode.com/tag/tree/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 75,
//           tags: ['tree', 'traversal']
//         },
//         {
//           id: 't10',
//           title: 'Heap and Priority Queue',
//           date: '2025-09-15',
//           completed: false,
//           description: 'Practice heap operations',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Heap Problems',
//               url: 'https://leetcode.com/tag/heap/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['heap', 'priority-queue']
//         },
//         {
//           id: 't11',
//           title: 'String Algorithms',
//           date: '2025-09-16',
//           completed: true,
//           description: 'KMP, Rabin-Karp algorithms',
//           priority: 'high',
//           resources: [
//             {
//               type: 'tutorial',
//               title: 'String Algorithms Guide',
//               url: 'https://www.geeksforgeeks.org/string-data-structure/',
//               icon: '📚'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['string', 'algorithms']
//         },
//         {
//           id: 't12',
//           title: 'Greedy Algorithms',
//           date: '2025-09-17',
//           completed: false,
//           description: 'Practice greedy approach problems',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Greedy Problems',
//               url: 'https://leetcode.com/tag/greedy/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 60,
//           tags: ['greedy', 'algorithms']
//         },
//         {
//           id: 't13',
//           title: 'Bit Manipulation',
//           date: '2025-09-18',
//           completed: true,
//           description: 'Practice bitwise operations',
//           priority: 'low',
//           resources: [
//             {
//               type: 'practice',
//               title: 'Bit Manipulation Problems',
//               url: 'https://leetcode.com/tag/bit-manipulation/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 45,
//           tags: ['bit-manipulation']
//         },
//         {
//           id: 't14',
//           title: 'Advanced DP Problems',
//           date: '2025-09-20',
//           completed: false,
//           description: 'Solve complex DP problems',
//           priority: 'high',
//           resources: [
//             {
//               type: 'practice',
//               title: 'DP Problems',
//               url: 'https://leetcode.com/tag/dynamic-programming/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 150,
//           tags: ['dynamic-programming', 'advanced']
//         },
//         {
//           id: 't15',
//           title: 'Review All Data Structures',
//           date: '2025-09-25',
//           completed: false,
//           description: 'Comprehensive review of all data structures',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'review',
//               title: 'DSA Cheat Sheet',
//               url: 'https://www.interviewcake.com/data-structures-reference',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 180,
//           tags: ['review', 'data-structures']
//         },
//         {
//           id: 't16',
//           title: 'Mock Coding Test',
//           date: '2025-09-27',
//           completed: false,
//           description: 'Full mock coding assessment',
//           priority: 'high',
//           resources: [
//             {
//               type: 'practice',
//               title: 'LeetCode Mock Test',
//               url: 'https://leetcode.com/explore/interview/card/mock-interviews/',
//               icon: '💻'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['mock-test', 'assessment']
//         },
//         {
//           id: 't17',
//           title: 'Final DSA Review',
//           date: '2025-09-28',
//           completed: false,
//           description: 'Last minute revision of key concepts',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'review',
//               title: 'Quick Revision Guide',
//               url: 'https://www.geeksforgeeks.org/data-structures/',
//               icon: '📚'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['review', 'revision']
//         }
//       ]
//     },
//     {
//       id: 'c2',
//       name: 'System Design',
//       color: 'bg-purple-500',
//       icon: '🏗️',
//       tasks: [
//         {
//           id: 't18',
//           title: 'Study Load Balancers',
//           date: '2025-09-01',
//           completed: true,
//           description: 'Understand different load balancing strategies',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'article',
//               title: 'Load Balancing Concepts',
//               url: 'https://aws.amazon.com/what-is/load-balancing/',
//               icon: '📄'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['load-balancing', 'scalability']
//         },
//         {
//           id: 't19',
//           title: 'Database Design Patterns',
//           date: '2025-09-02',
//           completed: false,
//           description: 'Learn about database sharding and replication',
//           priority: 'high',
//           resources: [
//             {
//               type: 'article',
//               title: 'Database Design Patterns',
//               url: 'https://www.digitalocean.com/community/tutorials/understanding-database-sharding',
//               icon: '📄'
//             }
//           ],
//           estimatedTime: 150,
//           tags: ['database', 'sharding', 'replication']
//         },
//         {
//           id: 't20',
//           title: 'Caching Strategies',
//           date: '2025-09-03',
//           completed: true,
//           description: 'Study Redis and Memcached implementations',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'tutorial',
//               title: 'Caching Best Practices',
//               url: 'https://redis.io/docs/latest/develop/use-cases/caching/',
//               icon: '📖'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['caching', 'redis', 'performance']
//         },
//         {
//           id: 't21',
//           title: 'API Design Principles',
//           date: '2025-09-06',
//           completed: false,
//           description: 'RESTful API design and best practices',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'article',
//               title: 'REST API Design',
//               url: 'https://restfulapi.net/',
//               icon: '📄'
//             }
//           ],
//           estimatedTime: 60,
//           tags: ['api', 'rest', 'design']
//         },
//         {
//           id: 't22',
//           title: 'Microservices Architecture',
//           date: '2025-09-12',
//           completed: true,
//           description: 'Learn microservices patterns',
//           priority: 'high',
//           resources: [
//             {
//               type: 'course',
//               title: 'Microservices Course',
//               url: 'https://www.educative.io/courses/grokking-the-system-design-interview',
//               icon: '🎓'
//             }
//           ],
//           estimatedTime: 180,
//           tags: ['microservices', 'architecture']
//         },
//         {
//           id: 't23',
//           title: 'Message Queues',
//           date: '2025-09-13',
//           completed: false,
//           description: 'Kafka and RabbitMQ fundamentals',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'tutorial',
//               title: 'Kafka Tutorial',
//               url: 'https://kafka.apache.org/documentation/',
//               icon: '📖'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['message-queues', 'kafka']
//         },
//         {
//           id: 't24',
//           title: 'CAP Theorem',
//           date: '2025-09-14',
//           completed: true,
//           description: 'Understand consistency, availability, partition tolerance',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'article',
//               title: 'CAP Theorem Explained',
//               url: 'https://www.ibm.com/topics/cap-theorem',
//               icon: '📄'
//             }
//           ],
//           estimatedTime: 45,
//           tags: ['cap-theorem', 'theory']
//         },
//         {
//           id: 't25',
//           title: 'System Design Mock',
//           date: '2025-09-15',
//           completed: false,
//           description: 'Design Twitter/TinyURL system',
//           priority: 'high',
//           resources: [
//             {
//               type: 'practice',
//               title: 'System Design Practice',
//               url: 'https://www.pramp.com/#/system-design',
//               icon: '👥'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['system-design', 'mock']
//         },
//         {
//           id: 't26',
//           title: 'Database Indexing',
//           date: '2025-09-16',
//           completed: false,
//           description: 'Learn about B-trees and indexing strategies',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'article',
//               title: 'Database Indexing Guide',
//               url: 'https://www.sqlshack.com/what-is-sql-server-index/',
//               icon: '📄'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['database', 'indexing', 'b-trees']
//         },
//         {
//           id: 't27',
//           title: 'Final System Design Review',
//           date: '2025-09-28',
//           completed: false,
//           description: 'Comprehensive system design revision',
//           priority: 'high',
//           resources: [
//             {
//               type: 'review',
//               title: 'System Design Cheat Sheet',
//               url: 'https://github.com/donnemartin/system-design-primer',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 150,
//           tags: ['review', 'system-design']
//         }
//       ]
//     },
//     {
//       id: 'c3',
//       name: 'Mock Interviews',
//       color: 'bg-green-500',
//       icon: '🎯',
//       tasks: [
//         {
//           id: 't28',
//           title: 'Practice with peer',
//           date: '2025-09-01',
//           completed: true,
//           description: 'Focus on behavioral questions and coding',
//           priority: 'high',
//           resources: [
//             {
//               type: 'platform',
//               title: 'Pramp - Mock Interviews',
//               url: 'https://www.pramp.com/',
//               icon: '👥'
//             }
//           ],
//           estimatedTime: 60,
//           tags: ['interview', 'behavioral', 'coding']
//         },
//         {
//           id: 't29',
//           title: 'Technical Mock Interview',
//           date: '2025-09-03',
//           completed: false,
//           description: 'Full technical interview simulation',
//           priority: 'high',
//           resources: [
//             {
//               type: 'platform',
//               title: 'Interviewing.io',
//               url: 'https://interviewing.io/',
//               icon: '👥'
//             }
//           ],
//           estimatedTime: 90,
//           tags: ['technical', 'coding', 'interview']
//         },
//         {
//           id: 't30',
//           title: 'System Design Mock',
//           date: '2025-09-06',
//           completed: true,
//           description: 'Practice system design questions',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'platform',
//               title: 'Pramp System Design',
//               url: 'https://www.pramp.com/#/system-design',
//               icon: '👥'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['system-design', 'architecture']
//         },
//         {
//           id: 't31',
//           title: 'Behavioral Interview Practice',
//           date: '2025-09-13',
//           completed: false,
//           description: 'STAR method practice',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'guide',
//               title: 'Behavioral Questions Guide',
//               url: 'https://www.themuse.com/advice/star-interview-method',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 45,
//           tags: ['behavioral', 'star']
//         },
//         {
//           id: 't32',
//           title: 'Final Mock Interview',
//           date: '2025-09-25',
//           completed: false,
//           description: 'Complete interview simulation',
//           priority: 'high',
//           resources: [
//             {
//               type: 'platform',
//               title: 'Full Mock Interview',
//               url: 'https://www.pramp.com/',
//               icon: '👥'
//             }
//           ],
//           estimatedTime: 120,
//           tags: ['mock', 'final', 'interview']
//         }
//       ]
//     },
//     {
//       id: 'c4',
//       name: 'Behavioral Prep',
//       color: 'bg-orange-500',
//       icon: '💬',
//       tasks: [
//         {
//           id: 't33',
//           title: 'STAR Method Practice',
//           date: '2025-09-02',
//           completed: true,
//           description: 'Prepare answers using STAR method',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'guide',
//               title: 'STAR Method Guide',
//               url: 'https://www.themuse.com/advice/star-interview-method',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 60,
//           tags: ['behavioral', 'star', 'communication']
//         },
//         {
//           id: 't34',
//           title: 'Company Research',
//           date: '2025-09-03',
//           completed: false,
//           description: 'Research target companies and their culture',
//           priority: 'low',
//           resources: [
//             {
//               type: 'website',
//               title: 'Glassdoor Reviews',
//               url: 'https://www.glassdoor.com/',
//               icon: '🌐'
//             }
//           ],
//           estimatedTime: 45,
//           tags: ['research', 'company', 'culture']
//         },
//         {
//           id: 't35',
//           title: 'Resume Review',
//           date: '2025-09-12',
//           completed: true,
//           description: 'Update and polish resume',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'tool',
//               title: 'Resume Builder',
//               url: 'https://www.resume.com/',
//               icon: '📝'
//             }
//           ],
//           estimatedTime: 60,
//           tags: ['resume', 'review']
//         },
//         {
//           id: 't36',
//           title: 'Elevator Pitch Practice',
//           date: '2025-09-14',
//           completed: false,
//           description: 'Practice 1-minute self-introduction',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'guide',
//               title: 'Elevator Pitch Guide',
//               url: 'https://www.themuse.com/advice/perfect-elevator-pitch-examples',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 30,
//           tags: ['elevator-pitch', 'communication']
//         },
//         {
//           id: 't37',
//           title: 'Questions for Interviewers',
//           date: '2025-09-16',
//           completed: true,
//           description: 'Prepare thoughtful questions to ask',
//           priority: 'low',
//           resources: [
//             {
//               type: 'guide',
//               title: 'Questions Guide',
//               url: 'https://www.themuse.com/advice/40-questions-to-ask-in-an-interview',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 30,
//           tags: ['questions', 'preparation']
//         },
//         {
//           id: 't38',
//           title: 'Final Behavioral Prep',
//           date: '2025-09-27',
//           completed: false,
//           description: 'Last minute behavioral review',
//           priority: 'medium',
//           resources: [
//             {
//               type: 'review',
//               title: 'Behavioral Prep Sheet',
//               url: 'https://www.crackingthecodinginterview.com/',
//               icon: '📋'
//             }
//           ],
//           estimatedTime: 45,
//           tags: ['behavioral', 'review', 'final']
//         }
//       ]
//     }
//   ]
// };

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
          date: '2025-09-01',
          completed: true,
          description: 'Focus on sliding window and two-pointer techniques',
          priority: 'high',
          resources: [
            {
              type: 'practice',
              title: 'LeetCode Array Problems',
              url: 'https://leetcode.com/tag/array/',
              icon: '💻'
            }
          ],
          estimatedTime: 120,
          tags: ['arrays', 'sliding-window', 'two-pointers']
        },
        {
          id: 't2',
          title: 'Practice Binary Search',
          date: '2025-09-02',
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
          date: '2025-09-03',
          completed: false,
          description: 'Learn DP patterns and memoization',
          priority: 'high',
          resources: [
            {
              type: 'tutorial',
              title: 'DP Patterns Guide',
              url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews',
              icon: '📖'
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
          id: 't18',
          title: 'Study Load Balancers',
          date: '2025-09-01',
          completed: true,
          description: 'Understand different load balancing strategies',
          priority: 'medium',
          resources: [
            {
              type: 'article',
              title: 'Load Balancing Concepts',
              url: 'https://aws.amazon.com/what-is/load-balancing/',
              icon: '📄'
            }
          ],
          estimatedTime: 120,
          tags: ['load-balancing', 'scalability']
        },
        {
          id: 't19',
          title: 'Database Design Patterns',
          date: '2025-09-02',
          completed: false,
          description: 'Learn about database sharding and replication',
          priority: 'high',
          resources: [
            {
              type: 'article',
              title: 'Database Design Patterns',
              url: 'https://www.digitalocean.com/community/tutorials/understanding-database-sharding',
              icon: '📄'
            }
          ],
          estimatedTime: 150,
          tags: ['database', 'sharding', 'replication']
        },
        {
          id: 't20',
          title: 'Caching Strategies',
          date: '2025-09-03',
          completed: true,
          description: 'Study Redis and Memcached implementations',
          priority: 'medium',
          resources: [
            {
              type: 'tutorial',
              title: 'Caching Best Practices',
              url: 'https://redis.io/docs/latest/develop/use-cases/caching/',
              icon: '📖'
            }
          ],
          estimatedTime: 90,
          tags: ['caching', 'redis', 'performance']
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
          id: 't28',
          title: 'Practice with peer',
          date: '2025-09-01',
          completed: true,
          description: 'Focus on behavioral questions and coding',
          priority: 'high',
          resources: [
            {
              type: 'platform',
              title: 'Pramp - Mock Interviews',
              url: 'https://www.pramp.com/',
              icon: '👥'
            }
          ],
          estimatedTime: 60,
          tags: ['interview', 'behavioral', 'coding']
        },
        {
          id: 't29',
          title: 'Technical Mock Interview',
          date: '2025-09-03',
          completed: false,
          description: 'Full technical interview simulation',
          priority: 'high',
          resources: [
            {
              type: 'platform',
              title: 'Interviewing.io',
              url: 'https://interviewing.io/',
              icon: '👥'
            }
          ],
          estimatedTime: 90,
          tags: ['technical', 'coding', 'interview']
        }
      ]
    },
    {
      id: 'c4',
      name: 'Behavioral Prep',
      color: 'bg-orange-500',
      icon: '💬',
      tasks: [
        {
          id: 't33',
          title: 'STAR Method Practice',
          date: '2025-09-02',
          completed: true,
          description: 'Prepare answers using STAR method',
          priority: 'medium',
          resources: [
            {
              type: 'guide',
              title: 'STAR Method Guide',
              url: 'https://www.themuse.com/advice/star-interview-method',
              icon: '📋'
            }
          ],
          estimatedTime: 60,
          tags: ['behavioral', 'star', 'communication']
        },
        {
          id: 't34',
          title: 'Company Research',
          date: '2025-09-03',
          completed: false,
          description: 'Research target companies and their culture',
          priority: 'low',
          resources: [
            {
              type: 'website',
              title: 'Glassdoor Reviews',
              url: 'https://www.glassdoor.com/',
              icon: '🌐'
            }
          ],
          estimatedTime: 45,
          tags: ['research', 'company', 'culture']
        }
      ]
    }
  ]
};