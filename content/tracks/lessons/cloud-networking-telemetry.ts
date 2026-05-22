import type { Lesson } from "../../../src/lib/types.ts";

const TRACK = "cloud-networking-telemetry";

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

const embeddedCommunicationProtocols: Lesson[] = [
  future("embedded-communication-protocols", 1, "serial-vs-parallel-communication", "Serial vs Parallel Communication", "Compare serial and parallel data transmission, examining pin count, clock skew, distance, and why modern systems favor serial links."),
  future("embedded-communication-protocols", 2, "uart-protocol-basics", "UART Protocol Basics", "Asynchronous serial framing with start bits, data bits, parity, and stop bits, and how two devices share a wire without a clock."),
  future("embedded-communication-protocols", 3, "baud-rates-and-clock-tolerance", "Baud Rates and Clock Tolerance", "How baud rate is set on each side of a UART link, and the clock-accuracy budget that lets asynchronous framing actually work."),
  future("embedded-communication-protocols", 4, "rs-232-and-rs-485-physical-layers", "RS-232 and RS-485 Physical Layers", "Voltage levels, differential signaling, multidrop wiring, and termination for industrial-grade serial communication over long distances."),
  future("embedded-communication-protocols", 5, "i2c-protocol-and-signaling", "I2C Protocol and Signaling", "Two-wire I2C with SDA and SCL, open-drain signaling, start and stop conditions, and ACK/NACK handshakes."),
  future("embedded-communication-protocols", 6, "i2c-addressing-and-bus-arbitration", "I2C Addressing and Bus Arbitration", "Seven and ten bit device addresses, read versus write bits, clock stretching, and how slaves coexist on a single bus."),
  future("embedded-communication-protocols", 7, "multi-master-i2c", "Multi-Master I2C", "How two masters arbitrate for the bus using wired-AND logic, lose gracefully, and avoid collisions on shared I2C lines."),
  future("embedded-communication-protocols", 8, "spi-protocol-and-signaling", "SPI Protocol and Signaling", "Four-wire SPI with MOSI, MISO, SCLK, and CS, clock polarity and phase modes, and high-speed synchronous transfers."),
  future("embedded-communication-protocols", 9, "spi-full-vs-half-duplex", "Full vs Half Duplex SPI", "Comparing standard four-wire full-duplex SPI to three-wire half-duplex variants, and the tradeoffs in pin count, throughput, and software complexity."),
  future("embedded-communication-protocols", 10, "can-bus-fundamentals", "CAN Bus Fundamentals", "Differential signaling on CAN-H and CAN-L, dominant and recessive bits, and why CAN dominates automotive and robotics networks."),
  future("embedded-communication-protocols", 11, "can-frame-format-and-arbitration", "CAN Frame Format and Arbitration", "Standard and extended CAN frames, identifier-based priority arbitration, error frames, and the bit-stuffing rule."),
  future("embedded-communication-protocols", 12, "can-fd-and-higher-bitrates", "CAN-FD and Higher Bitrates", "How CAN-FD extends classic CAN with flexible data rate and larger payloads, and the migration story for existing networks."),
  future("embedded-communication-protocols", 13, "usb-protocol-overview", "USB Protocol Overview", "USB topology with hosts, hubs, and devices, differential signaling, enumeration, and the transfer-type taxonomy."),
  future("embedded-communication-protocols", 14, "usb-endpoints-and-descriptors", "USB Endpoints and Descriptors", "Endpoints as the basic units of USB communication, descriptor trees, and how the host learns what a device can do."),
  future("embedded-communication-protocols", 15, "one-wire-protocol", "1-Wire Protocol", "Dallas/Maxim 1-Wire signaling on a single data line with parasitic power, ROM addressing, and reading temperature sensors."),
  future("embedded-communication-protocols", 16, "modbus-rtu-and-tcp", "MODBUS RTU and TCP", "MODBUS function codes, register maps, RTU framing on RS-485, and the move to MODBUS over TCP for industrial systems."),
  future("embedded-communication-protocols", 17, "i2s-for-audio-sensors", "I2S for Audio and MEMS Sensors", "The Inter-IC Sound protocol for streaming digital audio between codecs, microphones, and DSPs with bit clock and word select."),
  future("embedded-communication-protocols", 18, "mipi-csi-and-dsi-overview", "MIPI CSI and DSI Overview", "High-speed serial interfaces from the MIPI Alliance for cameras (CSI) and displays (DSI) common in mobile and embedded vision."),
  future("embedded-communication-protocols", 19, "choosing-an-embedded-protocol", "Choosing an Embedded Protocol", "A decision framework based on distance, speed, pin budget, power, noise tolerance, and ecosystem support for picking the right bus."),
  future("embedded-communication-protocols", 20, "using-a-logic-analyzer", "Using a Logic Analyzer", "Capturing UART, I2C, SPI, and CAN traffic with a logic analyzer, decoding protocols, and diagnosing real wiring and timing bugs."),
];

const networkingAndInternetProtocols: Lesson[] = [
  future("networking-and-internet-protocols", 1, "osi-and-tcp-ip-models", "The OSI and TCP/IP Models", "Layered networking models, what each layer is responsible for, and why the layered abstraction makes the modern internet work."),
  future("networking-and-internet-protocols", 2, "ipv4-and-ipv6-addressing", "IPv4 and IPv6 Addressing", "Address formats, public and private ranges, address exhaustion, and the rationale for the IPv6 transition."),
  future("networking-and-internet-protocols", 3, "subnetting-and-cidr", "Subnetting and CIDR", "Network masks, CIDR notation, subnet planning, and computing broadcast and host ranges by hand."),
  future("networking-and-internet-protocols", 4, "routing-and-the-default-gateway", "Routing and the Default Gateway", "How packets cross networks, routing tables, default gateways, and a quick tour of BGP and dynamic routing protocols."),
  future("networking-and-internet-protocols", 5, "tcp-vs-udp", "TCP vs UDP", "Reliability, ordering, and congestion control in TCP versus the lightweight datagram model of UDP, with use-case guidance."),
  future("networking-and-internet-protocols", 6, "tcp-three-way-handshake", "TCP Three-Way Handshake", "SYN, SYN-ACK, ACK and connection state, sequence numbers, and what goes wrong when handshakes fail or stall."),
  future("networking-and-internet-protocols", 7, "ports-and-the-socket-abstraction", "Ports and the Socket Abstraction", "Well-known, registered, and ephemeral ports, the four-tuple that identifies a connection, and listening versus connected sockets."),
  future("networking-and-internet-protocols", 8, "http-1-1-vs-http-2-vs-http-3", "HTTP/1.1 vs HTTP/2 vs HTTP/3", "Head-of-line blocking, multiplexing, binary framing, and QUIC, tracing how HTTP has evolved to keep the web fast."),
  future("networking-and-internet-protocols", 9, "rest-api-design", "REST API Design", "Resources, verbs, status codes, and idempotency, and the practical conventions that make HTTP APIs predictable to integrate against."),
  future("networking-and-internet-protocols", 10, "json-over-http", "JSON over HTTP", "Encoding payloads as JSON, content negotiation, schema versioning, and the realities of weak typing on the wire."),
  future("networking-and-internet-protocols", 11, "websockets-and-streaming", "WebSockets and Streaming", "Upgrading from HTTP to a persistent bidirectional WebSocket, framing, and when WebSockets beat polling for telemetry."),
  future("networking-and-internet-protocols", 12, "dns-resolution-and-caching", "DNS Resolution and Caching", "Recursive and authoritative resolvers, record types, TTLs, and how DNS caching shapes both latency and outages."),
  future("networking-and-internet-protocols", 13, "tls-handshake-and-cipher-suites", "TLS Handshake and Cipher Suites", "How TLS negotiates a session, key exchange, symmetric encryption, and the move from TLS 1.2 to TLS 1.3."),
  future("networking-and-internet-protocols", 14, "certificates-and-pki", "Certificates and Public Key Infrastructure", "X.509 certificates, certificate authorities, chains of trust, and how browsers and devices validate a server's identity."),
  future("networking-and-internet-protocols", 15, "socket-programming-basics", "Socket Programming Basics", "Creating TCP and UDP sockets from code, the listen/accept/connect lifecycle, and writing a minimal client and server."),
];

const realTimeDataAndMessaging: Lesson[] = [
  future("real-time-data-and-messaging", 1, "pub-sub-vs-request-response", "Publish-Subscribe vs Request-Response", "Two foundational messaging patterns, when each fits, and the implications for coupling, scaling, and failure modes."),
  future("real-time-data-and-messaging", 2, "mqtt-broker-and-topics", "MQTT Broker and Topics", "How MQTT brokers route messages over hierarchical topics, retained messages, last-will, and lightweight client design for IoT."),
  future("real-time-data-and-messaging", 3, "mqtt-qos-levels", "MQTT QoS Levels", "At-most-once, at-least-once, and exactly-once delivery, the message flows that implement them, and the cost of each guarantee."),
  future("real-time-data-and-messaging", 4, "grpc-and-protobuf", "gRPC and Protocol Buffers", "Defining services and messages in protobuf, generating clients and servers in multiple languages, and the binary wire format."),
  future("real-time-data-and-messaging", 5, "grpc-streaming-rpcs", "gRPC Streaming RPCs", "Unary, server-streaming, client-streaming, and bidirectional gRPC calls, and choosing the right pattern for telemetry pipelines."),
  future("real-time-data-and-messaging", 6, "ros2-and-dds-internals", "ROS2 and DDS Internals", "How ROS2 layers on top of DDS, discovery, quality-of-service policies, and the real-time data distribution model for robots."),
  future("real-time-data-and-messaging", 7, "kafka-topics-and-partitions", "Kafka Topics and Partitions", "The Kafka log abstraction, partitions, replication, consumer groups, and the throughput story behind large event pipelines."),
  future("real-time-data-and-messaging", 8, "time-series-databases-overview", "Time-Series Databases Overview", "What makes time-series workloads special, the shared design patterns across TSDBs, and where they sit in a telemetry stack."),
  future("real-time-data-and-messaging", 9, "influxdb-fundamentals", "InfluxDB Fundamentals", "Tags, fields, measurements, retention policies, and writing and querying time-series data with InfluxDB's line protocol and Flux."),
  future("real-time-data-and-messaging", 10, "timescaledb-and-postgres-time-series", "TimescaleDB and Postgres Time-Series", "Hypertables, continuous aggregates, and bringing time-series performance to a familiar relational SQL surface."),
  future("real-time-data-and-messaging", 11, "prometheus-and-pull-based-metrics", "Prometheus and Pull-Based Metrics", "The Prometheus data model, scraping, PromQL, and why a pull-based approach simplifies service discovery for metrics."),
  future("real-time-data-and-messaging", 12, "message-ordering-guarantees", "Message Ordering and Delivery Guarantees", "Total versus partial ordering, at-least-once and exactly-once semantics, and how brokers actually deliver on their promises."),
  future("real-time-data-and-messaging", 13, "idempotency-in-message-handlers", "Idempotency in Message Handlers", "Designing consumers that tolerate duplicate deliveries, using idempotency keys, deduplication windows, and idempotent writes."),
  future("real-time-data-and-messaging", 14, "backpressure-and-flow-control", "Backpressure and Flow Control", "What happens when producers outrun consumers, strategies for buffering, dropping, blocking, or shedding load gracefully."),
  future("real-time-data-and-messaging", 15, "designing-a-telemetry-message-bus", "Designing a Telemetry Message Bus", "Putting MQTT, gRPC, Kafka, and time-series storage together into a coherent pipeline for fleet telemetry."),
];

const dashboardsAndTimeSeries: Lesson[] = [
  future("dashboards-and-time-series", 1, "grafana-basics", "Grafana Basics", "The Grafana mental model of dashboards, panels, queries, and time ranges, and getting a first dashboard up and running."),
  future("dashboards-and-time-series", 2, "grafana-data-sources", "Grafana Data Sources", "Connecting Grafana to Prometheus, InfluxDB, Postgres, Loki, and cloud providers, and mixing sources in a single dashboard."),
  future("dashboards-and-time-series", 3, "grafana-panel-types", "Grafana Panel Types", "Time-series, gauge, stat, table, heatmap, and geomap panels, and matching panel choices to the question being asked."),
  future("dashboards-and-time-series", 4, "grafana-templating-and-variables", "Grafana Templating and Variables", "Dashboard variables, dependent dropdowns, and templating to build a single dashboard that serves an entire fleet."),
  future("dashboards-and-time-series", 5, "alerting-in-grafana", "Alerting in Grafana", "Defining alert rules, contact points, notification policies, and silences, and avoiding alert fatigue in unified Grafana alerting."),
  future("dashboards-and-time-series", 6, "plotly-dash-for-custom-apps", "Plotly Dash for Custom Apps", "Building interactive analytical web apps in Python with Plotly Dash, callbacks, and component layouts."),
  future("dashboards-and-time-series", 7, "custom-dashboard-architecture", "Custom Dashboard Architecture", "When Grafana stops being enough, and how to architect a bespoke dashboard with a metrics API, frontend, and caching layer."),
  future("dashboards-and-time-series", 8, "real-time-dashboard-updates", "Real-Time Dashboard Updates", "Streaming live updates over WebSockets or server-sent events, balancing freshness against backend load and browser cost."),
  future("dashboards-and-time-series", 9, "time-series-visualization-patterns", "Time-Series Visualization Patterns", "Choosing aggregation windows, downsampling, stacked versus overlaid series, and avoiding misleading y-axes."),
  future("dashboards-and-time-series", 10, "anomaly-detection-in-dashboards", "Anomaly Detection in Dashboards", "Surfacing anomalies with threshold rules, seasonal baselines, and simple statistical detectors embedded in your visualizations."),
  future("dashboards-and-time-series", 11, "log-dashboards-with-loki", "Log Dashboards with Loki", "Indexing logs by labels, LogQL queries, and combining logs with metrics on the same Grafana dashboard."),
  future("dashboards-and-time-series", 12, "distributed-tracing", "Distributed Tracing", "Spans, traces, context propagation, and using tracing to diagnose performance issues across many services and devices."),
  future("dashboards-and-time-series", 13, "opentelemetry-fundamentals", "OpenTelemetry Fundamentals", "The OpenTelemetry standard for instrumenting metrics, logs, and traces, the collector, and vendor-neutral observability."),
  future("dashboards-and-time-series", 14, "observability-triad-logs-metrics-traces", "The Observability Triad: Logs, Metrics, Traces", "How logs, metrics, and traces complement each other, when each is the right tool, and how they correlate in incident response."),
  future("dashboards-and-time-series", 15, "slo-and-sli-definition", "Defining SLOs and SLIs", "Picking service level indicators that matter, setting realistic objectives, error budgets, and using them to drive engineering decisions."),
];

const fleetOperationsAndReliability: Lesson[] = [
  future("fleet-operations-and-reliability", 1, "firmware-deployment-lifecycle", "Firmware Deployment Lifecycle", "Stages from build and signing through canary, staged rollout, and full deployment, and the artifacts that move at each step."),
  future("fleet-operations-and-reliability", 2, "ab-firmware-updates", "A/B Firmware Updates", "Dual-bank update strategies that let devices fall back to the previous image when a new one fails to boot or pass health checks."),
  future("fleet-operations-and-reliability", 3, "bootloader-strategies", "Bootloader Strategies", "Designing a bootloader that supports verified boot, recovery, factory reset, and safe image switching on embedded targets."),
  future("fleet-operations-and-reliability", 4, "ota-update-architectures", "OTA Update Architectures", "End-to-end OTA pipelines: artifact storage, delta updates, scheduling, network constraints, and rollback on failure."),
  future("fleet-operations-and-reliability", 5, "secure-boot-and-chain-of-trust", "Secure Boot and Chain of Trust", "Hardware root of trust, signed bootloader and firmware images, anti-rollback counters, and what they protect against."),
  future("fleet-operations-and-reliability", 6, "device-authentication-and-identity", "Device Authentication and Identity", "Provisioning per-device keys and certificates, mutual TLS, hardware-backed identity, and rotating credentials at fleet scale."),
  future("fleet-operations-and-reliability", 7, "telemetry-pipelines-end-to-end", "Telemetry Pipelines End to End", "Designing the path from on-device collector to cloud storage, including buffering, batching, compression, and retry."),
  future("fleet-operations-and-reliability", 8, "log-shipping-from-devices", "Log Shipping from Devices", "Lightweight log forwarders, ring buffers, structured logging, and shipping logs reliably over flaky connections."),
  future("fleet-operations-and-reliability", 9, "remote-debug-and-shell-access", "Remote Debug and Shell Access", "Safely accessing devices in the field with tunneled shells, ephemeral debug sessions, audit logs, and break-glass controls."),
  future("fleet-operations-and-reliability", 10, "postmortem-culture", "Postmortem Culture", "Blameless postmortems, timelines, contributing factors, and turning incidents into durable engineering improvements."),
  future("fleet-operations-and-reliability", 11, "reliability-engineering-principles", "Reliability Engineering Principles", "Redundancy, graceful degradation, blast radius, and the design patterns that keep large fleets running through partial failures."),
  future("fleet-operations-and-reliability", 12, "incident-response-process", "Incident Response Process", "Detection, declaration, command structure, communication, mitigation, and the discipline that turns chaos into a managed response."),
  future("fleet-operations-and-reliability", 13, "on-call-practices", "On-Call Practices", "Healthy rotations, paging hygiene, runbooks, handoffs, and reducing the human cost of carrying a pager."),
  future("fleet-operations-and-reliability", 14, "capacity-planning-for-fleets", "Capacity Planning for Fleets", "Forecasting compute, storage, and bandwidth growth as a fleet scales, and translating telemetry volume into infrastructure decisions."),
  future("fleet-operations-and-reliability", 15, "cloud-cost-management", "Cloud Cost Management", "Tagging, budgets, reserved capacity, egress traps, and engineering practices that keep cloud spend aligned with business value."),
];

export const cloudNetworkingTelemetryLessons: Lesson[] = [
  ...embeddedCommunicationProtocols,
  ...networkingAndInternetProtocols,
  ...realTimeDataAndMessaging,
  ...dashboardsAndTimeSeries,
  ...fleetOperationsAndReliability,
];
