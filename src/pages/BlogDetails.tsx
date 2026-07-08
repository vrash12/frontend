import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, getImageUrl } from "../api/client";
import type { BlogImage, BlogPost } from "../types";

function formatDate(date?: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function BlogDetails() {
  const { id } = useParams();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    api
      .get<BlogPost>(`/blogs/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch blog post:", error);
        setErrorMessage("Blog post not found or backend is not running.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const galleryImages: BlogImage[] = post?.images || [];
  const selectedImage =
    selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  function openImage(index: number) {
    setSelectedImageIndex(index);
  }

  function closeImageModal() {
    setSelectedImageIndex(null);
  }

  function showPreviousImage() {
    if (selectedImageIndex === null || galleryImages.length === 0) return;

    setSelectedImageIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    });
  }

  function showNextImage() {
    if (selectedImageIndex === null || galleryImages.length === 0) return;

    setSelectedImageIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    });
  }

  useEffect(() => {
    if (selectedImageIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeImageModal();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex, galleryImages.length]);

  if (loading) {
    return (
      <main className="blog-detail-loading">
        <p>Loading adventure...</p>
      </main>
    );
  }

  if (!post || errorMessage) {
    return (
      <main className="blog-detail-error">
        <p>{errorMessage || "Blog post not found."}</p>

        <Link to="/blogs" className="btn">
          Back to Quests
        </Link>
      </main>
    );
  }

  const tags = post.tags
    ? post.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const heroImage = post.image || post.images?.[0]?.image || "";

  return (
    <main className="adventure-detail-page">
      <section className="adventure-hero-neo">
        {heroImage && (
          <img
            src={getImageUrl(heroImage)}
            alt={post.title}
            className="adventure-hero-bg"
          />
        )}

        <div className="adventure-hero-noise" aria-hidden="true" />

        <div className="adventure-hero-content">
          <Link to="/blogs" className="adventure-back-link">
            ← Back to Adventure Quests
          </Link>

          <div className="adventure-meta-pills">
            {post.category && <span>{post.category}</span>}

            <span>{formatDate(post.adventure_date || post.created_at)}</span>

            {post.location && <span>{post.location}</span>}
          </div>

          <h1>{post.title}</h1>

          <p>{post.description}</p>
        </div>
      </section>

      <section className="adventure-detail-shell adventure-detail-shell-full">
        <article className="adventure-detail-main adventure-detail-main-full">
          {tags.length > 0 && (
            <div className="adventure-top-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          {galleryImages.length > 0 && (
            <section className="adventure-gallery-section adventure-gallery-full">
              <div className="adventure-section-heading adventure-section-heading-wide">
                <p className="section-kicker">Captured Frames</p>

                <h2>Snapshots From the Journey</h2>

                <p className="gallery-click-note">
                  Click any frame to open the mission viewer.
                </p>
              </div>

              <div className="adventure-gallery-collage adventure-gallery-collage-wide">
                {galleryImages.map((image, index) => (
                  <figure
                    key={image.id}
                    className={`adventure-gallery-item gallery-style-${
                      (index % 6) + 1
                    }`}
                  >
                    <button
                      type="button"
                      className="gallery-open-button"
                      onClick={() => openImage(index)}
                      aria-label={`Open frame ${index + 1}`}
                    >
                      <img
                        src={getImageUrl(image.image)}
                        alt={`${post.title} photo ${index + 1}`}
                      />

                      <span className="gallery-hover-label">Open Frame</span>
                    </button>

                    <figcaption>
                      Frame {String(index + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="adventure-story-card adventure-story-card-wide">
            <div className="adventure-section-heading">
              <p className="section-kicker">Story Log</p>

              <h2>The Full Adventure</h2>
            </div>

            <div
              className="adventure-story-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </section>
        </article>
      </section>

      {selectedImage && selectedImageIndex !== null && (
        <div
          className="neo-image-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeImageModal}
        >
          <div
            className="neo-image-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="neo-modal-topbar">
              <div>
                <span className="neo-modal-kicker">Mission Viewer</span>
                <strong>
                  Frame {String(selectedImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(galleryImages.length).padStart(2, "0")}
                </strong>
              </div>

              <button
                type="button"
                className="neo-modal-close"
                onClick={closeImageModal}
                aria-label="Close image viewer"
              >
                ×
              </button>
            </div>

            <div className="neo-modal-image-wrap">
              <button
                type="button"
                className="neo-modal-nav neo-modal-prev"
                onClick={showPreviousImage}
                aria-label="Previous image"
              >
                ←
              </button>

              <img
                src={getImageUrl(selectedImage.image)}
                alt={`${post.title} enlarged frame ${selectedImageIndex + 1}`}
                className="neo-modal-image"
              />

              <button
                type="button"
                className="neo-modal-nav neo-modal-next"
                onClick={showNextImage}
                aria-label="Next image"
              >
                →
              </button>
            </div>

            <div className="neo-modal-footer">
              <span>{post.title}</span>

        
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default BlogDetails;