import type { Lesson } from "../../../src/lib/types.ts";

const TRACK = "optimization";

function future(
  moduleSlug: string,
  order: number,
  slug: string,
  title: string,
  summary: string,
  options: { estimatedMinutes?: number; prerequisites?: string[] } = {},
): Lesson {
  return {
    slug,
    trackSlug: TRACK,
    moduleSlug,
    title,
    summary,
    kind: "lesson",
    status: "future",
    order,
    estimatedMinutes: options.estimatedMinutes ?? 90,
    prerequisites: options.prerequisites,
    mdxPath: `content/lessons/${slug}.mdx`,
  };
}

const optimizationFoundations: Lesson[] = [
  future("optimization-foundations", 1, "framing-an-optimization-problem", "Framing an Optimization Problem", "Decision variables, objective functions, and constraints as the universal language of optimization across engineering and science."),
  future("optimization-foundations", 2, "unconstrained-vs-constrained-problems", "Unconstrained vs Constrained Problems", "How feasibility sets reshape optimization, and why constrained problems require fundamentally different machinery than unconstrained ones."),
  future("optimization-foundations", 3, "local-vs-global-minima", "Local vs Global Minima", "Definitions of local and global optima, why nonconvex landscapes admit many local minima, and when local solutions suffice."),
  future("optimization-foundations", 4, "gradient-as-direction-of-steepest-ascent", "Gradient as Direction of Steepest Ascent", "Geometric derivation of the gradient as the direction of steepest increase, and the negative gradient as the descent direction."),
  future("optimization-foundations", 5, "gradient-descent-algorithm", "The Gradient Descent Algorithm", "The canonical first-order method, its iteration formula, and the role of step size in convergence and stability."),
  future("optimization-foundations", 6, "exact-line-search", "Exact Line Search", "Choosing the step size by exactly minimizing the objective along the search direction, and when this is computationally feasible."),
  future("optimization-foundations", 7, "backtracking-line-search", "Backtracking Line Search", "The Armijo sufficient-decrease condition and backtracking as a practical, cheap alternative to exact line search."),
  future("optimization-foundations", 8, "wolfe-conditions", "The Wolfe Conditions", "Strong and weak Wolfe conditions combining sufficient decrease with curvature requirements for robust step-size selection."),
  future("optimization-foundations", 9, "momentum-methods", "Momentum Methods", "Adding a velocity term to gradient descent to dampen oscillations and accelerate progress in ill-conditioned valleys."),
  future("optimization-foundations", 10, "nesterov-accelerated-gradient", "Nesterov Accelerated Gradient", "Nesterov's look-ahead momentum scheme achieving the optimal O(1/k^2) rate for smooth convex functions."),
  future("optimization-foundations", 11, "stochastic-gradient-descent-intro", "Stochastic Gradient Descent: Introduction", "Replacing the full gradient with a noisy single-sample estimate, and why this trade scales optimization to massive datasets."),
  future("optimization-foundations", 12, "mini-batch-sgd", "Mini-Batch Stochastic Gradient Descent", "Mini-batches as the practical compromise between full-batch stability and per-sample noise, with hardware utilization considerations."),
  future("optimization-foundations", 13, "convergence-rates-intuition", "Convergence Rates: Intuition", "Sublinear, linear, and quadratic convergence rates, what they mean in practice, and how problem structure determines the rate."),
  future("optimization-foundations", 14, "smoothness-and-lipschitz-continuity", "Smoothness and Lipschitz Continuity", "L-smoothness of gradients, the descent lemma, and how Lipschitz constants set safe step sizes."),
  future("optimization-foundations", 15, "strong-convexity", "Strong Convexity", "Strong convexity as quadratic lower-bound curvature, and its role in guaranteeing linear convergence of first-order methods."),
];

const convexOptimization: Lesson[] = [
  future("convex-optimization", 1, "convex-sets-and-preserving-operations", "Convex Sets and Operations Preserving Convexity", "Definition of convex sets, key examples (halfspaces, polyhedra, cones), and operations like intersection and affine maps that preserve convexity."),
  future("convex-optimization", 2, "convex-functions-and-characterizations", "Convex Functions and Characterizations", "First- and second-order characterizations of convex functions, sublevel sets, and the central role of convexity in tractable optimization."),
  future("convex-optimization", 3, "jensens-inequality", "Jensen's Inequality", "Jensen's inequality for convex functions, its probabilistic form, and applications in information theory and statistics."),
  future("convex-optimization", 4, "epigraph-view-of-convexity", "The Epigraph View of Convexity", "Recasting convex functions as convex sets via their epigraphs, unifying convex set and convex function theory."),
  future("convex-optimization", 5, "linear-programming", "Linear Programming", "LP standard and inequality forms, geometry of polyhedral feasible regions, and vertex optimality of linear objectives."),
  future("convex-optimization", 6, "simplex-algorithm-intuition", "Simplex Algorithm Intuition", "Dantzig's simplex method as a vertex-walking algorithm, pivot rules, and why it works well despite exponential worst case."),
  future("convex-optimization", 7, "interior-point-methods-for-lp", "Interior-Point Methods for LP", "Karmarkar's breakthrough and modern primal-dual interior-point methods that traverse the interior of the feasible region."),
  future("convex-optimization", 8, "quadratic-programming", "Quadratic Programming", "QPs with convex quadratic objectives and linear constraints, applications in regression, SVMs, and portfolio selection."),
  future("convex-optimization", 9, "second-order-cone-programming", "Second-Order Cone Programming", "SOCPs generalizing LP and QP via the Lorentz cone, with applications to robust optimization and beamforming."),
  future("convex-optimization", 10, "semidefinite-programming", "Semidefinite Programming", "Optimization over the cone of positive semidefinite matrices, LMI constraints, and modern SDP solvers."),
  future("convex-optimization", 11, "conic-optimization-unified-view", "Conic Optimization: Unified View", "The conic programming framework unifying LP, SOCP, and SDP under a single duality theory and algorithmic umbrella."),
  future("convex-optimization", 12, "lagrangian-and-dual-function", "The Lagrangian and Dual Function", "Constructing the Lagrangian, the dual function as a pointwise infimum, and the dual problem as concave maximization."),
  future("convex-optimization", 13, "weak-and-strong-duality", "Weak and Strong Duality", "Weak duality as a universal lower bound, Slater's condition for strong duality, and the duality gap as a certificate of optimality."),
  future("convex-optimization", 14, "kkt-optimality-conditions", "KKT Optimality Conditions", "Stationarity, primal and dual feasibility, and complementary slackness as the canonical first-order optimality conditions."),
  future("convex-optimization", 15, "sensitivity-analysis-and-shadow-prices", "Sensitivity Analysis and Shadow Prices", "Lagrange multipliers as sensitivities of the optimal value to constraint perturbations, and their economic interpretation as shadow prices."),
  future("convex-optimization", 16, "convex-applications-in-machine-learning", "Convex Applications in Machine Learning", "Logistic regression, support vector machines, lasso, and other convex formulations central to classical ML."),
  future("convex-optimization", 17, "convex-applications-in-control", "Convex Applications in Control", "LQR, H-infinity synthesis via LMIs, and model predictive control as repeated convex programs."),
  future("convex-optimization", 18, "convex-applications-in-finance", "Convex Applications in Finance", "Markowitz mean-variance portfolio optimization, risk-parity allocation, and convex risk measures."),
  future("convex-optimization", 19, "convex-relaxations-of-nonconvex-problems", "Convex Relaxations of Nonconvex Problems", "SDP relaxations of MaxCut, l1 relaxation of sparsity, and lifting techniques that approximate nonconvex problems with convex ones."),
  future("convex-optimization", 20, "modeling-with-cvxpy", "Modeling with CVXPY", "Disciplined convex programming, declarative problem specification in CVXPY, and verifying convexity automatically."),
];

const nonlinearOptimization: Lesson[] = [
  future("nonlinear-optimization", 1, "newtons-method-derivation", "Newton's Method: Derivation", "Newton's method derived from second-order Taylor expansion, and its interpretation as solving a quadratic model exactly at each step."),
  future("nonlinear-optimization", 2, "newtons-method-convergence", "Newton's Method: Convergence", "Quadratic local convergence of Newton's method near a strict minimum, and its sensitivity to indefinite Hessians and poor initialization."),
  future("nonlinear-optimization", 3, "quasi-newton-intuition", "Quasi-Newton Intuition", "Approximating the Hessian from gradient differences, the secant equation, and the bridge between gradient descent and Newton's method."),
  future("nonlinear-optimization", 4, "bfgs-update", "The BFGS Update", "The BFGS rank-two Hessian approximation update, its symmetric positive-definite preservation, and its role as the default dense quasi-Newton method."),
  future("nonlinear-optimization", 5, "l-bfgs-for-large-scale", "L-BFGS for Large-Scale Problems", "Limited-memory BFGS storing only recent gradient and step pairs, the two-loop recursion, and large-scale deep learning applications."),
  future("nonlinear-optimization", 6, "trust-region-methods", "Trust-Region Methods", "Trust-region framework: a local quadratic model trusted only within a ball, with radius adapted based on agreement with the true function."),
  future("nonlinear-optimization", 7, "cauchy-point-and-dogleg", "Cauchy Point and Dogleg", "Approximate trust-region subproblem solvers: the Cauchy point along the steepest descent and the dogleg path combining it with the Newton step."),
  future("nonlinear-optimization", 8, "conjugate-gradient-for-quadratics", "Conjugate Gradient for Quadratics", "Hestenes-Stiefel conjugate gradient as the optimal Krylov-subspace method for symmetric positive-definite quadratic minimization."),
  future("nonlinear-optimization", 9, "nonlinear-conjugate-gradient", "Nonlinear Conjugate Gradient", "Extending CG to nonquadratic problems via Fletcher-Reeves and Polak-Ribiere formulas, with periodic restarts for robustness."),
  future("nonlinear-optimization", 10, "levenberg-marquardt-for-least-squares", "Levenberg-Marquardt for Least Squares", "Levenberg-Marquardt as a damped Gauss-Newton method interpolating between gradient descent and Gauss-Newton for nonlinear least squares."),
  future("nonlinear-optimization", 11, "gauss-newton-method", "The Gauss-Newton Method", "Gauss-Newton exploiting the structure of sum-of-squares objectives by approximating the Hessian with the Jacobian transpose times Jacobian."),
  future("nonlinear-optimization", 12, "hessian-approximations", "Hessian Approximations", "Strategies for approximating Hessians: finite differences, automatic differentiation Hessian-vector products, and structured low-rank approximations."),
  future("nonlinear-optimization", 13, "nonconvex-landscape-intuition", "Nonconvex Landscape Intuition", "Geometry of nonconvex objectives: many local minima, plateaus, ridges, and the optimization landscapes of deep networks."),
  future("nonlinear-optimization", 14, "saddle-points-and-second-order-methods", "Saddle Points and Second-Order Methods", "Why saddle points dominate high-dimensional nonconvex landscapes and how second-order curvature information helps escape them."),
  future("nonlinear-optimization", 15, "comparison-of-nonlinear-methods", "Comparison of Nonlinear Methods", "Tradeoffs across gradient descent, conjugate gradient, BFGS, L-BFGS, Newton, and trust-region methods across problem regimes."),
];

const constrainedAndDiscreteOptimization: Lesson[] = [
  future("constrained-and-discrete-optimization", 1, "equality-constrained-optimization", "Equality-Constrained Optimization", "Optimizing over a smooth manifold defined by equality constraints, and the geometry of tangent and normal spaces at the optimum."),
  future("constrained-and-discrete-optimization", 2, "lagrange-multipliers-revisited", "Lagrange Multipliers Revisited", "The Lagrange multiplier rule for equality constraints, its geometric meaning as gradient alignment, and reduced-gradient methods."),
  future("constrained-and-discrete-optimization", 3, "inequality-constraints-and-slack-variables", "Inequality Constraints and Slack Variables", "Reformulating inequality constraints with slack variables, and the active-set viewpoint at the optimum."),
  future("constrained-and-discrete-optimization", 4, "kkt-conditions-for-general-problems", "KKT Conditions for General Problems", "The full KKT system for problems with mixed equality and inequality constraints, and constraint qualifications like LICQ."),
  future("constrained-and-discrete-optimization", 5, "penalty-methods", "Penalty Methods", "Replacing constraints with penalty terms in the objective, quadratic and exact penalties, and ill-conditioning as the penalty grows."),
  future("constrained-and-discrete-optimization", 6, "augmented-lagrangian", "Augmented Lagrangian Methods", "Augmented Lagrangian combining penalty and multiplier updates to achieve exactness without penalty parameter blowup."),
  future("constrained-and-discrete-optimization", 7, "barrier-methods", "Barrier Methods", "Logarithmic barriers replacing inequality constraints with smooth interior penalties, and the central path traced as the barrier weakens."),
  future("constrained-and-discrete-optimization", 8, "interior-point-algorithms", "Interior-Point Algorithms", "Primal-dual interior-point algorithms following the central path with Newton steps, achieving polynomial complexity for convex problems."),
  future("constrained-and-discrete-optimization", 9, "sequential-quadratic-programming", "Sequential Quadratic Programming", "SQP as Newton's method applied to the KKT conditions, solving a QP subproblem at each iteration."),
  future("constrained-and-discrete-optimization", 10, "integer-programming-introduction", "Integer Programming: Introduction", "Optimization with integer decision variables, modeling logical constraints, and the combinatorial explosion of the feasible set."),
  future("constrained-and-discrete-optimization", 11, "mixed-integer-linear-programming", "Mixed-Integer Linear Programming", "MILP formulations combining continuous and discrete variables, big-M tricks, and indicator constraints."),
  future("constrained-and-discrete-optimization", 12, "branch-and-bound", "Branch-and-Bound", "Systematic enumeration via branching on fractional variables, bounding with LP relaxations, and pruning subtrees by infeasibility or dominance."),
  future("constrained-and-discrete-optimization", 13, "cutting-planes", "Cutting Planes", "Tightening LP relaxations with valid inequalities (Gomory cuts, cover inequalities) and modern branch-and-cut solvers."),
  future("constrained-and-discrete-optimization", 14, "np-hardness-in-optimization", "NP-Hardness in Optimization", "Computational complexity of optimization, NP-hard combinatorial problems, and the implications for algorithm design."),
  future("constrained-and-discrete-optimization", 15, "convex-relaxations-of-combinatorial-problems", "Convex Relaxations of Combinatorial Problems", "LP, SDP, and Lasserre hierarchies as relaxations of NP-hard problems, with approximation guarantees via rounding."),
];

const appliedOptimization: Lesson[] = [
  future("applied-optimization", 1, "stochastic-optimization-for-ml-training", "Stochastic Optimization for ML Training", "SGD, learning-rate schedules, warmup, and decoupled weight decay as the workhorses of modern neural network training."),
  future("applied-optimization", 2, "adam-and-adaptive-methods", "Adam and Adaptive Methods", "Adagrad, RMSProp, and Adam as adaptive per-parameter step-size methods, their convergence caveats, and AdamW corrections."),
  future("applied-optimization", 3, "second-order-methods-for-ml", "Second-Order Methods for ML: K-FAC and Shampoo", "Structured second-order methods for deep learning: Kronecker-factored approximate curvature (K-FAC) and Shampoo preconditioning."),
  future("applied-optimization", 4, "model-predictive-control-as-optimization", "Model-Predictive Control as Optimization", "MPC as a receding-horizon optimization solved repeatedly online, with stability and recursive feasibility considerations."),
  future("applied-optimization", 5, "trajectory-optimization-for-robotics", "Trajectory Optimization for Robotics", "Direct collocation, shooting methods, and DDP/iLQR for optimizing robot trajectories under dynamics and contact constraints."),
  future("applied-optimization", 6, "optimal-experiment-design", "Optimal Experiment Design", "A-, D-, and E-optimality criteria for selecting experiments that maximize information gain about unknown parameters."),
  future("applied-optimization", 7, "portfolio-optimization", "Portfolio Optimization", "Mean-variance optimization, robust portfolios under estimation error, transaction costs, and chance-constrained formulations."),
  future("applied-optimization", 8, "optimization-in-pcb-and-chip-design", "Optimization in PCB Layout and Chip Design", "Placement and routing as combinatorial optimization, analytical placement via quadratic programming, and timing-driven optimization."),
  future("applied-optimization", 9, "scheduling-and-assignment-problems", "Scheduling and Assignment Problems", "Job-shop scheduling, the assignment problem and Hungarian algorithm, and constraint programming for complex scheduling."),
  future("applied-optimization", 10, "hyperparameter-optimization", "Hyperparameter Optimization", "Bayesian optimization with Gaussian processes, multi-fidelity methods like Hyperband and ASHA, and population-based training."),
];

export const optimizationLessons: Lesson[] = [
  ...optimizationFoundations,
  ...convexOptimization,
  ...nonlinearOptimization,
  ...constrainedAndDiscreteOptimization,
  ...appliedOptimization,
];
