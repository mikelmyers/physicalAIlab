import type { Lesson } from "../../../src/lib/types.ts";

const TRACK = "numerical-methods";

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

const numericalLinearAlgebra: Lesson[] = [
  future("numerical-linear-algebra", 1, "floating-point-arithmetic-fundamentals", "Floating-Point Arithmetic Fundamentals", "How computers represent real numbers, the trade-offs between precision and range, and the consequences for numerical computation."),
  future("numerical-linear-algebra", 2, "ieee-754-standard-and-rounding", "IEEE 754 Standard and Rounding", "Single and double precision layouts, rounding modes, and the guarantees IEEE 754 makes for portable numerical code."),
  future("numerical-linear-algebra", 3, "machine-epsilon-and-unit-roundoff", "Machine Epsilon and Unit Roundoff", "Defining machine epsilon, distinguishing it from the smallest representable number, and using it to reason about achievable accuracy."),
  future("numerical-linear-algebra", 4, "conditioning-of-linear-systems", "Conditioning of Linear Systems", "Condition number of a matrix, how it amplifies input perturbations into solution errors, and the geometry of ill-conditioning."),
  future("numerical-linear-algebra", 5, "gaussian-elimination-with-partial-pivoting", "Gaussian Elimination with Partial Pivoting", "Why naive elimination fails on small pivots, the partial pivoting strategy, and the growth-factor analysis of Trefethen and Bau."),
  future("numerical-linear-algebra", 6, "lu-factorization-and-triangular-solves", "LU Factorization and Triangular Solves", "Storing elimination as A = LU, forward and backward substitution, and reusing the factorization for many right-hand sides."),
  future("numerical-linear-algebra", 7, "cholesky-factorization-for-spd-matrices", "Cholesky Factorization for SPD Matrices", "The A = LL^T factorization for symmetric positive definite systems, half the work of LU, and applications in optimization and statistics."),
  future("numerical-linear-algebra", 8, "qr-factorization-gram-schmidt", "QR Factorization via Gram-Schmidt", "Classical and modified Gram-Schmidt, why classical is numerically unstable, and the role of QR in least-squares problems."),
  future("numerical-linear-algebra", 9, "qr-factorization-householder-and-givens", "QR Factorization via Householder and Givens", "Householder reflectors and Givens rotations as stable orthogonal transformations, and when to prefer each in dense and sparse settings."),
  future("numerical-linear-algebra", 10, "svd-computation-jacobi-and-qr-algorithm", "SVD Computation: Jacobi and the QR Algorithm", "How the singular value decomposition is actually computed via one-sided Jacobi rotations and the implicit QR algorithm."),
  future("numerical-linear-algebra", 11, "iterative-methods-overview", "Iterative Methods Overview", "When direct factorizations are too expensive, splitting methods and Krylov subspace methods, and the role of matrix-vector products."),
  future("numerical-linear-algebra", 12, "jacobi-and-gauss-seidel-iteration", "Jacobi and Gauss-Seidel Iteration", "The two classical stationary iterations, convergence by spectral radius of the iteration matrix, and successive over-relaxation (SOR)."),
  future("numerical-linear-algebra", 13, "conjugate-gradient-method", "The Conjugate Gradient Method", "CG for symmetric positive definite systems, the Krylov subspace interpretation, and convergence as a function of the condition number."),
  future("numerical-linear-algebra", 14, "gmres-for-nonsymmetric-systems", "GMRES for Non-Symmetric Systems", "The generalized minimal residual method, Arnoldi iteration, restarted GMRES, and convergence behavior on non-normal matrices."),
  future("numerical-linear-algebra", 15, "preconditioning-and-sparse-data-structures", "Preconditioning and Sparse Data Structures", "Incomplete LU and algebraic multigrid preconditioners, and sparse storage formats (CSR, CSC, COO) for large-scale problems."),
];

const numericalIntegrationAndQuadrature: Lesson[] = [
  future("numerical-integration-and-quadrature", 1, "riemann-sums-vs-proper-quadrature", "Riemann Sums vs. Proper Quadrature", "Why textbook Riemann sums are a poor numerical recipe, and what distinguishes a quadrature rule from a naive partition sum."),
  future("numerical-integration-and-quadrature", 2, "trapezoidal-rule", "The Trapezoidal Rule", "Approximating an integral by trapezoids, composite trapezoidal rule, and its second-order error term in the Euler-Maclaurin expansion."),
  future("numerical-integration-and-quadrature", 3, "simpsons-rule", "Simpson's Rule", "Simpson's 1/3 and 3/8 rules from local polynomial interpolation, composite Simpson's, and why even-degree Newton-Cotes formulas gain an order."),
  future("numerical-integration-and-quadrature", 4, "error-analysis-of-quadrature", "Error Analysis of Quadrature", "Truncation error formulas, degree of exactness, and how smoothness of the integrand controls convergence rates."),
  future("numerical-integration-and-quadrature", 5, "romberg-integration", "Romberg Integration", "Richardson extrapolation applied to the trapezoidal rule, exponential improvement in accuracy, and connection to the Euler-Maclaurin series."),
  future("numerical-integration-and-quadrature", 6, "adaptive-quadrature", "Adaptive Quadrature", "Recursive subdivision driven by local error estimates, handling integrands with sharp features, and the algorithms behind QUADPACK."),
  future("numerical-integration-and-quadrature", 7, "gaussian-quadrature", "Gaussian Quadrature", "Quadrature rules that achieve degree of exactness 2n-1 with n nodes, Gauss-Legendre and Gauss-Hermite families, and weight-function generalization."),
  future("numerical-integration-and-quadrature", 8, "orthogonal-polynomial-roots", "Orthogonal Polynomial Roots", "Computing Gauss nodes as eigenvalues of the Jacobi matrix, the Golub-Welsch algorithm, and tabulated versus computed rules."),
  future("numerical-integration-and-quadrature", 9, "multi-dimensional-integration", "Multi-Dimensional Integration", "Tensor-product quadrature, the curse of dimensionality, sparse grids (Smolyak), and quasi-Monte Carlo low-discrepancy sequences."),
  future("numerical-integration-and-quadrature", 10, "monte-carlo-integration-and-variance-reduction", "Monte Carlo Integration and Variance Reduction", "The O(1/sqrt(N)) convergence of random sampling, importance sampling, control variates, stratification, and antithetic variates."),
];

const odeNumericalMethods: Lesson[] = [
  future("ode-numerical-methods", 1, "initial-value-problems-setup", "Initial Value Problems Setup", "Formulating ODEs as y' = f(t, y), reduction of higher-order equations to first-order systems, and existence-uniqueness conditions."),
  future("ode-numerical-methods", 2, "forward-euler-method", "Forward Euler Method", "The simplest explicit time integrator, local truncation error versus global error, and why it is a useful pedagogical baseline."),
  future("ode-numerical-methods", 3, "backward-euler-method", "Backward Euler Method", "The implicit Euler scheme, solving the implicit equation at each step, and unconditional stability for linear test problems."),
  future("ode-numerical-methods", 4, "midpoint-and-heun-methods", "Midpoint and Heun Methods", "Second-order methods derived as Taylor or predictor-corrector schemes, and the geometric picture of slope averaging."),
  future("ode-numerical-methods", 5, "runge-kutta-family", "The Runge-Kutta Family", "General s-stage RK formulation, Butcher tableaux, and the order conditions that constrain the coefficients."),
  future("ode-numerical-methods", 6, "rk4-standard-method", "RK4: The Standard Method", "The classical fourth-order Runge-Kutta scheme, why it remains the default explicit integrator, and worked examples on oscillators and orbits."),
  future("ode-numerical-methods", 7, "embedded-rk-and-adaptive-step-size", "Embedded RK and Adaptive Step Size", "RKF45 and Dormand-Prince pairs, using the difference between two embedded estimates to control step size and error."),
  future("ode-numerical-methods", 8, "multistep-methods-adams", "Multistep Methods: Adams-Bashforth and Adams-Moulton", "Linear multistep methods derived from polynomial interpolation, explicit Adams-Bashforth and implicit Adams-Moulton predictor-correctors."),
  future("ode-numerical-methods", 9, "stiff-equations-and-a-stability", "Stiff Equations and A-Stability", "What makes an ODE stiff, the linear test equation y' = lambda y, and Dahlquist's A-stability concept for choosing integrators."),
  future("ode-numerical-methods", 10, "implicit-methods-for-stiff-systems", "Implicit Methods for Stiff Systems", "Solving nonlinear implicit stages via Newton iteration, diagonally implicit RK methods, and the trade-off of work per step versus step size."),
  future("ode-numerical-methods", 11, "bdf-methods", "Backward Differentiation Formula (BDF) Methods", "BDF1 through BDF6, their stability regions, and the role of BDF schemes in CVODE, DASSL, and chemical kinetics codes."),
  future("ode-numerical-methods", 12, "symplectic-integrators-for-hamiltonian-systems", "Symplectic Integrators for Hamiltonian Systems", "Preserving the symplectic structure of Hamiltonian flows, symplectic Euler and Stormer-Verlet, and long-term energy behavior."),
  future("ode-numerical-methods", 13, "boundary-value-problems-by-shooting", "Boundary Value Problems by Shooting", "Converting a BVP into a sequence of IVPs, single and multiple shooting, and Newton iteration on the shooting parameters."),
  future("ode-numerical-methods", 14, "bvp-collocation-methods", "BVP Collocation Methods", "Collocation at Gauss points, piecewise polynomial bases, and the algorithms behind bvp4c and COLNEW for two-point boundary value problems."),
  future("ode-numerical-methods", 15, "software-for-odes", "Software for ODEs", "Survey of production ODE solvers (SUNDIALS, SciPy, DifferentialEquations.jl), how to choose between them, and interpreting solver diagnostics."),
];

const pdeAndFiniteElementMethods: Lesson[] = [
  future("pde-and-finite-element-methods", 1, "classification-of-pdes", "Classification of PDEs", "Elliptic, parabolic, and hyperbolic equations, the canonical examples (Poisson, heat, wave), and how classification dictates discretization strategy."),
  future("pde-and-finite-element-methods", 2, "finite-difference-for-1d-poisson", "Finite Difference for the 1D Poisson Equation", "Three-point centered differences, the tridiagonal system, boundary conditions, and second-order convergence."),
  future("pde-and-finite-element-methods", 3, "finite-difference-for-heat-equation", "Finite Difference for the Heat Equation", "Explicit FTCS, implicit BTCS, and Crank-Nicolson schemes for the parabolic heat equation, comparing accuracy and stability."),
  future("pde-and-finite-element-methods", 4, "von-neumann-stability-analysis", "Von Neumann Stability Analysis", "Fourier analysis of finite-difference schemes, amplification factors, and deriving stability conditions for linear discretizations."),
  future("pde-and-finite-element-methods", 5, "cfl-condition", "The CFL Condition", "Courant-Friedrichs-Lewy condition for hyperbolic problems, its geometric interpretation, and why it bounds explicit time steps."),
  future("pde-and-finite-element-methods", 6, "finite-difference-for-wave-equation", "Finite Difference for the Wave Equation", "Second-order central differences in space and time, the leapfrog scheme, and dispersion error on coarse grids."),
  future("pde-and-finite-element-methods", 7, "upwind-schemes", "Upwind Schemes for Advection", "First-order upwind, Lax-Friedrichs, and Lax-Wendroff schemes, balancing dissipation and dispersion, and Godunov's theorem on monotonicity."),
  future("pde-and-finite-element-methods", 8, "finite-volume-methods", "Finite Volume Methods", "Cell-centered conservation laws, numerical fluxes (Roe, HLLC), and why finite volumes are the workhorse for compressible flow."),
  future("pde-and-finite-element-methods", 9, "finite-element-method-intro", "Finite Element Method: Introduction", "From strong form to weak form, the Galerkin projection, and why FEM handles complex geometry and physics that finite differences cannot."),
  future("pde-and-finite-element-methods", 10, "weak-formulation", "Weak Formulation of PDEs", "Sobolev spaces, integration by parts, natural and essential boundary conditions, and the Lax-Milgram theorem for well-posedness."),
  future("pde-and-finite-element-methods", 11, "basis-functions-for-fem", "Basis Functions for FEM", "Lagrange P1 and P2 elements, Hermite elements, hierarchical bases, and the trade-offs between continuity, accuracy, and conditioning."),
  future("pde-and-finite-element-methods", 12, "assembly-of-stiffness-matrix", "Assembly of the Stiffness Matrix", "Element-level integrals, mapping local contributions to a global sparse matrix, and the inner loop of every FEM code."),
  future("pde-and-finite-element-methods", 13, "mesh-generation", "Mesh Generation", "Structured and unstructured meshes, Delaunay triangulation, advancing front methods, and quality metrics for finite-element meshes."),
  future("pde-and-finite-element-methods", 14, "isoparametric-elements", "Isoparametric Elements", "Mapping a reference element to a physical element with the same shape functions used for the solution, and the Jacobian of the map."),
  future("pde-and-finite-element-methods", 15, "time-stepping-for-pdes", "Time-Stepping for PDEs", "Method-of-lines semi-discretization, choosing time integrators for parabolic and hyperbolic problems, and operator splitting."),
  future("pde-and-finite-element-methods", 16, "spectral-methods", "Spectral Methods", "Global basis functions, exponential convergence for smooth solutions, and the trade-off versus local methods on complex geometry."),
  future("pde-and-finite-element-methods", 17, "chebyshev-and-fourier-collocation", "Chebyshev and Fourier Collocation", "Fourier collocation for periodic problems, Chebyshev collocation for non-periodic problems, and the role of the FFT in spectral codes."),
  future("pde-and-finite-element-methods", 18, "multigrid-methods", "Multigrid Methods", "V-cycles, smoothing and coarse-grid correction, and why multigrid achieves O(N) solution of elliptic problems."),
  future("pde-and-finite-element-methods", 19, "domain-decomposition", "Domain Decomposition", "Schwarz alternating method, Schur complement methods, and how domain decomposition enables parallel PDE solvers."),
  future("pde-and-finite-element-methods", 20, "software-fenics-and-dealii", "Software: FEniCS, deal.II, and Friends", "Survey of modern PDE software (FEniCS, deal.II, Firedrake, MFEM), variational form languages, and choosing a framework for a project."),
];

const automaticDifferentiation: Lesson[] = [
  future("automatic-differentiation", 1, "numerical-vs-symbolic-vs-algorithmic-differentiation", "Numerical vs. Symbolic vs. Algorithmic Differentiation", "Three ways to compute derivatives, the pitfalls of finite differences, expression swell in symbolic systems, and why AD wins for ML and simulation."),
  future("automatic-differentiation", 2, "dual-numbers-and-forward-mode", "Dual Numbers and Forward Mode", "Dual number arithmetic as a clean implementation of forward-mode AD, propagating derivatives through every elementary operation."),
  future("automatic-differentiation", 3, "computational-graphs-and-reverse-mode", "Computational Graphs and Reverse Mode", "Recording the forward pass as a DAG, backpropagating sensitivities, and why reverse mode is asymptotically optimal for scalar-valued objectives."),
  future("automatic-differentiation", 4, "the-adjoint-method", "The Adjoint Method", "Deriving adjoint equations for ODE-constrained and PDE-constrained optimization, and the equivalence between adjoint methods and reverse-mode AD."),
  future("automatic-differentiation", 5, "vector-jacobian-products", "Vector-Jacobian Products (VJPs)", "The atomic operation of reverse-mode AD, how each primitive's VJP rule is registered, and writing custom VJPs for performance."),
  future("automatic-differentiation", 6, "jacobian-vector-products", "Jacobian-Vector Products (JVPs)", "The forward-mode primitive, combining JVPs with VJPs to compute Hessians efficiently, and the jvp/vjp dual relationship."),
  future("automatic-differentiation", 7, "higher-order-derivatives-via-ad", "Higher-Order Derivatives via AD", "Hessians, Hessian-vector products, and stacking forward and reverse mode (forward-over-reverse) for memory-efficient second derivatives."),
  future("automatic-differentiation", 8, "jax-programming-model-and-transformations", "JAX Programming Model and Transformations", "Pure functions, composable transformations (grad, jit, vmap, pmap), and the trace-then-compile execution model behind JAX."),
  future("automatic-differentiation", 9, "pytorch-autograd-internals", "PyTorch Autograd Internals", "The dynamic tape, Function and Variable abstractions, in-place operation rules, and tools like torch.func for functional transformations."),
  future("automatic-differentiation", 10, "autodiff-for-control-problems", "Autodiff for Control Problems", "Differentiating through ODE solvers, the adjoint sensitivity method versus full backpropagation, and modern differentiable simulators."),
];

const numericalStabilityAndErrorAnalysis: Lesson[] = [
  future("numerical-stability-and-error-analysis", 1, "sources-of-error-in-computation", "Sources of Error in Computation", "Roundoff, truncation, discretization, and modeling error, and how each enters a scientific computing pipeline."),
  future("numerical-stability-and-error-analysis", 2, "absolute-and-relative-error", "Absolute and Relative Error", "Defining the two error metrics, when each is appropriate, and using relative error to compare quantities at different scales."),
  future("numerical-stability-and-error-analysis", 3, "condition-number-of-a-problem", "Condition Number of a Problem", "Condition number as a property of the problem (not the algorithm), worked examples for root-finding and linear systems."),
  future("numerical-stability-and-error-analysis", 4, "forward-and-backward-stability", "Forward and Backward Stability of Algorithms", "Trefethen and Bau's framework: backward stable algorithms produce the exact answer to a slightly perturbed problem; forward errors then follow."),
  future("numerical-stability-and-error-analysis", 5, "ieee-754-details", "IEEE 754 Details: Denormals, NaN, and Infinity", "Subnormal numbers and gradual underflow, the propagation rules for NaN and Inf, and signed zeros."),
  future("numerical-stability-and-error-analysis", 6, "catastrophic-cancellation-examples", "Catastrophic Cancellation Examples", "Subtracting nearly equal numbers, classic case studies (quadratic formula, variance computation, finite differences), and how to rewrite expressions."),
  future("numerical-stability-and-error-analysis", 7, "kahan-summation", "Kahan Summation and Compensated Algorithms", "Kahan's compensated summation algorithm, error bounds independent of N, and other compensated arithmetic techniques."),
  future("numerical-stability-and-error-analysis", 8, "well-vs-ill-conditioned-problems", "Well-Conditioned vs. Ill-Conditioned Problems", "Recognizing ill-conditioned problems before computing, regularization as a remedy, and famous examples (Hilbert matrix, Vandermonde)."),
  future("numerical-stability-and-error-analysis", 9, "mixed-precision-computing-pitfalls", "Mixed-Precision Computing Pitfalls", "FP16, BF16, and FP8 on modern accelerators, iterative refinement to recover double precision accuracy, and pitfalls in deep learning training."),
  future("numerical-stability-and-error-analysis", 10, "choosing-algorithms-for-accuracy", "Choosing Algorithms for Accuracy", "A practitioner's checklist: identify the conditioning of your problem, pick a backward-stable algorithm, validate with perturbation studies."),
];

export const numericalMethodsLessons: Lesson[] = [
  ...numericalLinearAlgebra,
  ...numericalIntegrationAndQuadrature,
  ...odeNumericalMethods,
  ...pdeAndFiniteElementMethods,
  ...automaticDifferentiation,
  ...numericalStabilityAndErrorAnalysis,
];
