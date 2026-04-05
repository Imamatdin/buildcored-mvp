import { useState, useEffect, FormEvent } from "react";
import {
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Star,
  Lock,
  X,
  GripVertical,
  Eye,
  EyeOff,
  Settings,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

// --- Types ---

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  repo_url: string | null;
  live_url: string | null;
  tags: string[];
  author_name: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  image_url: "",
  repo_url: "",
  live_url: "",
  tags: "",
  author_name: "",
  featured: false,
  display_order: 0,
};

type View = "login" | "setup" | "dashboard" | "settings";

// --- Auth helpers ---

function getToken(): string | null {
  return sessionStorage.getItem("admin_token");
}

function setToken(token: string) {
  sessionStorage.setItem("admin_token", token);
}

function clearToken() {
  sessionStorage.removeItem("admin_token");
}

function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  return fetch(path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
}

// --- Password input with eye toggle ---

function PasswordInput({
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full px-4 py-3 pr-12 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition"
        tabIndex={-1}
      >
        {visible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

// --- Main Component ---

export default function Admin() {
  const [view, setView] = useState<View>("login");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Login / Setup state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Dashboard state
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Settings state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmNewPw, setConfirmNewPw] = useState("");
  const [settingsMsg, setSettingsMsg] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  // Check status on mount
  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    setLoading(true);
    try {
      // First check if we have a valid token
      const token = getToken();
      if (token) {
        const res = await authFetch("/api/admin/showcase");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          setView("dashboard");
          setLoading(false);
          return;
        }
        // Token expired/invalid
        clearToken();
      }

      // Check if admin is configured
      const statusRes = await fetch("/api/admin/status");
      const { configured } = await statusRes.json();
      setView(configured ? "login" : "setup");
    } catch {
      setError("Could not connect to server");
    }
    setLoading(false);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setPassword("");
      await fetchProjects();
      setView("dashboard");
    } catch {
      setError("Connection error");
    }
    setLoading(false);
  }

  async function handleSetup(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Setup failed");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setPassword("");
      setConfirmPassword("");
      await fetchProjects();
      setView("dashboard");
    } catch {
      setError("Connection error");
    }
    setLoading(false);
  }

  function logout() {
    clearToken();
    setView("login");
    setProjects([]);
    setPassword("");
  }

  async function fetchProjects() {
    const res = await authFetch("/api/admin/showcase");
    if (res.ok) {
      setProjects(await res.json());
    } else if (res.status === 401) {
      clearToken();
      setView("login");
    }
  }

  function openAddForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(project: Project) {
    setForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url || "",
      repo_url: project.repo_url || "",
      live_url: project.live_url || "",
      tags: project.tags.join(", "),
      author_name: project.author_name || "",
      featured: project.featured,
      display_order: project.display_order,
    });
    setEditingId(project.id);
    setShowForm(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      image_url: form.image_url || null,
      repo_url: form.repo_url || null,
      live_url: form.live_url || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      author_name: form.author_name || null,
      featured: form.featured,
      display_order: form.display_order,
    };

    if (editingId) {
      await authFetch("/api/admin/showcase", {
        method: "PUT",
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await authFetch("/api/admin/showcase", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    await fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await authFetch(`/api/admin/showcase?id=${id}`, { method: "DELETE" });
    await fetchProjects();
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setSettingsError("");
    setSettingsMsg("");

    if (newPw.length < 8) {
      setSettingsError("New password must be at least 8 characters");
      return;
    }

    if (newPw !== confirmNewPw) {
      setSettingsError("New passwords do not match");
      return;
    }

    setChangingPw(true);
    try {
      const res = await authFetch("/api/admin/change-password", {
        method: "POST",
        body: JSON.stringify({
          current_password: currentPw,
          new_password: newPw,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSettingsError(data.error || "Failed to change password");
        setChangingPw(false);
        return;
      }

      // Update token with the fresh one
      setToken(data.token);
      setCurrentPw("");
      setNewPw("");
      setConfirmNewPw("");
      setSettingsMsg("Password changed successfully");
    } catch {
      setSettingsError("Connection error");
    }
    setChangingPw(false);
  }

  // --- Loading screen ---
  if (loading && view === "login") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    );
  }

  // --- Setup screen (first time) ---
  if (view === "setup") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={handleSetup}
          className="w-full max-w-sm bg-card border border-border rounded-lg p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-secondary">
              <KeyRound className="h-6 w-6 text-white/70" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground text-center mb-2">
            Set Up Admin
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Create a password for the admin panel. Choose a strong password — it
            will be securely hashed.
          </p>

          <div className="space-y-3 mb-4">
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Password (min 8 characters)"
              autoFocus
            />
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm password"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive mb-4 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Create Admin Account"}
          </button>
        </form>
      </main>
    );
  }

  // --- Login screen ---
  if (view === "login") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card border border-border rounded-lg p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-secondary">
              <Lock className="h-6 w-6 text-white/70" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground text-center mb-2">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enter your admin password to continue
          </p>

          <div className="mb-4">
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-destructive mb-4 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </main>
    );
  }

  // --- Settings view ---
  if (view === "settings") {
    return (
      <main className="min-h-screen">
        <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setView("dashboard");
                  setSettingsMsg("");
                  setSettingsError("");
                }}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h1 className="text-lg font-bold text-foreground">Settings</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="max-w-xl mx-auto px-6 py-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <KeyRound className="h-5 w-5 text-white/70" />
              <h2 className="text-lg font-semibold text-foreground">
                Change Password
              </h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Current Password
                </label>
                <PasswordInput
                  value={currentPw}
                  onChange={setCurrentPw}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  New Password
                </label>
                <PasswordInput
                  value={newPw}
                  onChange={setNewPw}
                  placeholder="New password (min 8 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Confirm New Password
                </label>
                <PasswordInput
                  value={confirmNewPw}
                  onChange={setConfirmNewPw}
                  placeholder="Confirm new password"
                />
              </div>

              {settingsError && (
                <p className="text-sm text-destructive">{settingsError}</p>
              )}
              {settingsMsg && (
                <p className="text-sm text-white/70">{settingsMsg}</p>
              )}

              <button
                type="submit"
                disabled={changingPw}
                className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-50"
              >
                {changingPw ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // --- Dashboard ---
  return (
    <main className="min-h-screen">
      {/* Header bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">
            <span className="text-white/70">Showcase</span> Admin
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
            <button
              onClick={() => {
                setSettingsMsg("");
                setSettingsError("");
                setCurrentPw("");
                setNewPw("");
                setConfirmNewPw("");
                setView("settings");
              }}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Projects</p>
            <p className="text-2xl font-bold text-foreground">
              {projects.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold text-white/70">
              {projects.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Last Added</p>
            <p className="text-sm font-medium text-foreground mt-1">
              {projects.length > 0
                ? new Date(projects[0].created_at).toLocaleDateString()
                : "\u2014"}
            </p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl bg-card border border-border rounded-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="p-1 hover:bg-secondary rounded transition"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Title *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30 resize-none"
                    placeholder="A brief description of the project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Image URL
                  </label>
                  <input
                    value={form.image_url}
                    onChange={(e) =>
                      setForm({ ...form, image_url: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="https://example.com/screenshot.png"
                  />
                  {form.image_url && (
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="mt-2 rounded-lg h-32 object-cover border border-border"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Repo URL
                    </label>
                    <input
                      value={form.repo_url}
                      onChange={(e) =>
                        setForm({ ...form, repo_url: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Live URL
                    </label>
                    <input
                      value={form.live_url}
                      onChange={(e) =>
                        setForm({ ...form, live_url: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                      placeholder="https://myproject.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Author
                    </label>
                    <input
                      value={form.author_name}
                      onChange={(e) =>
                        setForm({ ...form, author_name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Tags
                    </label>
                    <input
                      value={form.tags}
                      onChange={(e) =>
                        setForm({ ...form, tags: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                      placeholder="React, TypeScript, AI"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={form.display_order}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          display_order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-white/30"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-5">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-border accent-white"
                    />
                    <span className="text-sm text-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 text-white/70" />
                      Featured
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Project list */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-lg">
            <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No projects yet
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first showcase project
            </p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 group hover:border-white/20 transition"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground/30 shrink-0" />

                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt=""
                    className="h-14 w-20 object-cover rounded border border-border shrink-0"
                  />
                ) : (
                  <div className="h-14 w-20 bg-secondary rounded border border-border shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star className="h-3.5 w-3.5 text-white/70 fill-white/70 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.author_name && (
                      <span className="text-xs text-muted-foreground">
                        by {project.author_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEditForm(project)}
                    className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
