import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Simple in-memory auth state
final ValueNotifier<bool> authNotifier = ValueNotifier<bool>(false);

// GoRouter configuration
final GoRouter appRouter = GoRouter(
  initialLocation: '/login',
  refreshListenable: authNotifier,
  redirect: (context, state) {
    final loggedIn = authNotifier.value;
    final goingToLogin = state.matchedLocation == '/login';
    if (!loggedIn && !goingToLogin) return '/login';
    if (loggedIn && goingToLogin) return '/home';
    return null;
  },
  routes: [
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginPage(),
    ),
    GoRoute(
      path: '/home',
      name: 'home',
      builder: (context, state) => const MyHomePage(title: 'Home'),
    ),
  ],
);

// Simple mock LoginPage
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  void _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);

    // mock delay to simulate network auth
    await Future.delayed(const Duration(milliseconds: 500));

    // mark as logged in and navigate to home
    authNotifier.value = true;
    if (!mounted) return;
    context.go('/home');
  }

  String? _validateEmail(String? v) {
    if (v == null || v.isEmpty) return 'Enter email';
    final re = RegExp(r'^[^@]+@[^@]+\.[^@]+');
    if (!re.hasMatch(v)) return 'Enter valid email';
    return null;
  }

  String? _validatePass(String? v) {
    if (v == null || v.isEmpty) return 'Enter password';
    if (v.length < 4) return 'Password too short';
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextFormField(
                    controller: _emailCtrl,
                    keyboardType: TextInputType.emailAddress,
                    decoration: const InputDecoration(labelText: 'Email'),
                    validator: _validateEmail,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _passCtrl,
                    obscureText: true,
                    decoration: const InputDecoration(labelText: 'Password'),
                    validator: _validatePass,
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _loading ? null : _submit,
                      child: _loading
                          ? const SizedBox(height: 16, width: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                          : const Text('Login'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// Simple Home page with logout
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() => setState(() => _counter++);

  void _logout() {
    authNotifier.value = false;
    context.go('/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        actions: [
          IconButton(onPressed: _logout, icon: const Icon(Icons.logout)),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text('$_counter', style: Theme.of(context).textTheme.headlineMedium),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
